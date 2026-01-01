import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/requests", requestRoutes);
// app.use("/uploads", express.static("src/uploads"));
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminAuthRoutes);

export default app;
