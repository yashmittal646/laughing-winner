import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  // Accept both "Bearer token" and just "token"
  if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "");
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (err) {
    console.error("AUTH ERROR:", err);
    res.status(401).json({ message: "Token validation failed" });
  }
};
