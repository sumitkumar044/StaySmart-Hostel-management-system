import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile:String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student"
  },
  assignedRoom: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Room",
  default: null,
}

}, { timestamps: true });

const User = mongoose.model("User", userSchema, "users"); // 👈 VERY IMPORTANT

export default User;
