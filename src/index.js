const express = require("express");

const app = express();
const PORT = 3000;

// Auth middleware
app.use((req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || auth !== "Bearer mysecrettoken") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
});

// Test route
app.get("/api/posts", (req, res) => {
  res.json({ message: "Authorized request successful" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
