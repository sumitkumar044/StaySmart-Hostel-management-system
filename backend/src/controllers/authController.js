import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import errorHandler from "../utils/errorHandler.js";

export const register = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password)
    return errorHandler(res, 400, "All fields required");

  const exists = await User.findOne({ email });
  if (exists) return errorHandler(res, 400, "User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    mobile,
    password: hashed,
  });

  res.json({ success: true });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return errorHandler(res, 404, "User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return errorHandler(res, 401, "Invalid credentials");

res.json({
  success: true,
  token: generateToken(user),
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});

};
