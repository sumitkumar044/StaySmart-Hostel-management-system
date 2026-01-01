import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

/* 🔥 IMPORTANT LINE (ERROR FIX) */
const Fee = mongoose.models.Fee || mongoose.model("Fee", feeSchema);

export default Fee;
