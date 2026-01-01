import Room from "../models/Room.js";
import mongoose from "mongoose";

export const getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

export const createRoom = async (req, res) => {
  try {
    const { roomNumber, rent, capacity } = req.body;
    const room = await Room.create({
      roomNumber,
      rent: Number(rent),
      capacity: Number(capacity),
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getRoomById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Room ID" });
  }
  const room = await Room.findById(id);
  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }
  res.json(room);
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const room = await Room.findById(id);
  if (!room) return res.status(404).json({ message: "Room not found" });

  room.roomNumber = req.body.roomNumber || room.roomNumber;
  room.rent = req.body.rent ? Number(req.body.rent) : room.rent;
  room.capacity = req.body.capacity ? Number(req.body.capacity) : room.capacity;
  
  if (req.file) {
    room.image = `/uploads/${req.file.filename}`;
  }
  await room.save();
  res.json(room);
};
