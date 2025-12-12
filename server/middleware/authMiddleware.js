import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token invalid" });
      }

      // Add user info to request object
      req.user = decoded;
      next();
    });

  } catch (error) {
    res.status(500).json({ message: "Auth error", error: error.message });
  }
};
