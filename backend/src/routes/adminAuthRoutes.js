import express from "express";
import {
  sendAdminOtp,
  verifyAdminOtp,
} from "../controllers/adminAuthController.js";

const router = express.Router();

router.post("/send-otp", sendAdminOtp);
router.post("/verify-otp", verifyAdminOtp);

export default router;
