"use client";

import { useEffect, useState, useCallback } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  expiresAt: string;
  onExpire: () => void;
}

export function CountdownTimer({ expiresAt, onExpire }: CountdownTimerProps) {
  const calculateRemaining = useCallback((): number => {
    const target = new Date(expiresAt).getTime();
    const now = Date.now();
    return Math.max(0, Math.floor((target - now) / 1000));
  }, [expiresAt]);

  const [remainingSeconds, setRemainingSeconds] = useState<number>(calculateRemaining);

  useEffect(() => {
    if (calculateRemaining() <= 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      const remaining = calculateRemaining();
      setRemainingSeconds(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateRemaining, onExpire]);

  const days = Math.floor(remainingSeconds / 86400);
  const hours = Math.floor((remainingSeconds % 86400) / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  // Show urgent state in the last hour
  const isUrgent = remainingSeconds > 0 && remainingSeconds <= 3600;

  const formatCountdown = () => {
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }
    if (hours > 0) {
      return `${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 font-mono text-xs ${
        isUrgent ? "text-amber-400 font-semibold" : "text-neutral-400"
      }`}
    >
      <Clock className="h-3.5 w-3.5 shrink-0" />
      <span>
        Expires in {formatCountdown()}
      </span>
    </div>
  );
}
