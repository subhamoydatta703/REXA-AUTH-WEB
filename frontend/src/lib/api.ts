export interface TokenGenerationResponse {
  success: boolean;
  message: string;
  token: string;
  expiresAt: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

/**
 * Generates a one-time REXA CLI token by calling the backend API.
 * The user identity is securely determined by Clerk session on the backend.
 * Zero tokens or credentials appear in the URL.
 */
export async function generateCliToken(
  clerkSessionToken?: string | null
): Promise<TokenGenerationResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:5000";

  if (!clerkSessionToken) {
    throw new Error("Authentication session is required. Please sign in again.");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${clerkSessionToken}`,
  };

  // Primary endpoint per project specification: POST /api/token
  const primaryUrl = `${baseUrl}/api/token`;
  const fallbackUrl = `${baseUrl}/api/auth/token`;

  let response: Response;
  try {
    response = await fetch(primaryUrl, {
      method: "POST",
      headers,
    });

    // If 404, gracefully fallback to /api/auth/token where Express router may be mounted
    if (response.status === 404) {
      response = await fetch(fallbackUrl, {
        method: "POST",
        headers,
      });
    }
  } catch {
    throw new Error(
      "Unable to connect to the REXA API server. Please verify your connection or try again later."
    );
  }

  let data: TokenGenerationResponse | ApiErrorResponse;
  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response format received from server.");
  }

  if (!response.ok || !data.success) {
    const errorMessage =
      ("message" in data && typeof data.message === "string" && data.message) ||
      "Failed to generate CLI token. Please try again.";
    throw new Error(errorMessage);
  }

  if (!("token" in data) || !data.token || !("expiresAt" in data) || !data.expiresAt) {
    throw new Error("Incomplete token payload received from server.");
  }

  return data;
}
