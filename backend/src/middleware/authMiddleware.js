// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(401).json({ message: "User not in DB" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export const isAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Admin only" });
//   }
//   next();
// };

// export const isStudent = (req, res, next) => {
//   if (req.user.role !== "student") {
//     return res.status(403).json({ message: "Student only" });
//   }
//   next();
// };

// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 1) Common protect middleware  → sirf valid token check + user load
export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    // 🔥 Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 DB se user lao
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔥 Request me user attach
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token failed" });
  }
};

// 2) Sirf ADMIN allowed
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  next();
};

// 3) Sirf STUDENT allowed
export const isStudent = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Student only" });
  }

  next();
};
