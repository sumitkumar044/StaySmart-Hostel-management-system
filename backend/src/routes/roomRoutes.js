import express from "express";
import {
  getRooms,
  createRoom,
  getRoomById,
  updateRoom,
} from "../controllers/roomController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", protect, getRooms);
router.post("/", protect, isAdmin, upload.single("image"), createRoom);
router.get("/:id", protect, getRoomById);
router.put("/:id", protect, isAdmin, upload.single("image"), updateRoom);

export default router;
