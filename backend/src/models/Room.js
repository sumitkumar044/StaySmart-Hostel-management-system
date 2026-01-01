import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: String,
    rent: Number,
    capacity: Number,
    occupied: { type: Number, default: 0 },
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
