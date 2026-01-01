import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

let otpStore = {};

/* ===== TOKEN ===== */
const generateAdminToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

/* ===== SEND OTP ===== */
export const sendAdminOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // 🔐 env admin check
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "You are not admin" });
    }

    // 🔐 DB admin check
    const admin = await User.findOne({ email });
    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ message: "Admin not found in DB" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    await sendEmail(email, otp);

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("SEND OTP ERROR 👉", err.message);
    res.status(500).json({ message: "OTP send failed" });
  }
};

/* ===== VERIFY OTP ===== */
export const verifyAdminOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const data = otpStore[email];
    const MASTER_OTP = process.env.ADMIN_MASTER_OTP;

    // 1. Pehle check karein ki kya ye Master OTP hai
    if (MASTER_OTP && otp === MASTER_OTP) {
       // Master OTP sahi hai, aage badhein
    } 
    // 2. Agar master nahi hai, toh check karein ki kya real OTP store mein hai
    else if (!data) {
      return res.status(400).json({ message: "OTP not found or expired" });
    } 
    // 3. Check karein ki real OTP match ho raha hai ya nahi
    else if (data.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    } 
    // 4. Check karein ki expiry toh nahi hui
    else if (Date.now() > data.expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }

    // Agar upar koi error nahi aaya, toh Admin ko DB mein check karein
    const admin = await User.findOne({ email });
    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ message: "Admin not in DB" });
    }

    // Login success: OTP delete karein (agar master nahi tha toh)
    if (otp !== MASTER_OTP) {
      delete otpStore[email];
    }

    const token = generateAdminToken(admin);
    res.json({ success: true, token, user: { id: admin._id, email: admin.email, role: admin.role } });

  } catch (err) {
    console.error("VERIFY OTP ERROR 👉", err.message);
    res.status(500).json({ message: "OTP verification failed" });
  }
};