import jwt from "jsonwebtoken";
import User from "../models/User.js";

const ADMIN_PASSWORD = "sumit123";

const generateAdminToken = (admin) => {
  return jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password required" });
    }

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "You are not admin" });
    }

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const admin = await User.findOne({ email });
    if (!admin || admin.role !== "admin") {
      return res
        .status(404)
        .json({ message: "Admin not found in DB" });
    }

    const token = generateAdminToken(admin);

    return res.json({
      success: true,
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("ADMIN LOGIN ERROR 👉", err.message);
    return res.status(500).json({ message: "Login failed" });
  }
};
