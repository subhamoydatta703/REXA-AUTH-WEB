import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`REXA backend server running on http://localhost:${PORT}`);
});
