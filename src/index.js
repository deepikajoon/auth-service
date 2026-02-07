const express = require("express");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());
/*  */
// 🔐 Auth Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

// 🚦 Rate Limiting (API only)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});

app.use("/api", apiLimiter);

// 🔑 PUBLIC LOGIN ROUTE
app.post("/login", (req, res) => {
  const user = { id: 1, role: "user" };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// 🔒 PROTECTED ROUTE
app.get("/api/posts", authMiddleware, (req, res) => {
  res.json({
    message: "Authorized request successful",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
