// src/controllers/feeController.js
import Fee from "../models/Fee.js";
import Room from "../models/Room.js";
import Request from "../models/Request.js";
import User from "../models/User.js";

/* ============== ADMIN: ADD FEE (one room → all students) ============== */
export const addFee = async (req, res) => {
  try {
    const { roomNumber, amount, month } = req.body;

    if (!roomNumber || !amount || !month) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    // 1) Room find karo
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "This room does not exist" });
    }

    // 2) Is room ke saare accepted students lao
    const allocations = await Request.find({
      room: room._id,
      status: "accepted",
    }).populate("student");

    if (!allocations.length) {
      return res.status(400).json({
        success: false,
        message: "This room is empty and not allocated to any student",
      });
    }

    // 3) Har allocated student ke liye fee create karo
    const createdFees = [];

    for (const a of allocations) {
      const studentId = a.student._id;

      // Optional: same month ke duplicate fee avoid
      const existing = await Fee.findOne({
        student: studentId,
        month,
      });
      if (existing) {
        continue; // skip if already have this month fee
      }

      const fee = await Fee.create({
        student: studentId,
        amount: Number(amount),
        month,
        status: "Pending",
      });

      createdFees.push(fee);
    }

    if (!createdFees.length) {
      return res.status(400).json({
        success: false,
        message:
          "Fees for this month already exist for all students in this room",
      });
    }

    return res.json({
      success: true,
      message: `Fee created for ${createdFees.length} student(s) in room ${roomNumber}`,
      fees: createdFees,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error while adding fee" });
  }
};

/* ============== ADMIN: GET ALL FEES (with roomNumber) ============== */
export const getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate("student", "name email");

    const withRooms = await Promise.all(
      fees.map(async (f) => {
        const allocation = await Request.findOne({
          student: f.student._id,
          status: "accepted",
        }).populate("room", "roomNumber");

        return {
          ...f.toObject(),
          roomNumber: allocation?.room?.roomNumber || null,
        };
      })
    );

    res.json({ success: true, fees: withRooms });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching fees" });
  }
};

/* ============== ADMIN: MARK FEE PAID ============== */
export const markFeePaid = async (req, res) => {
  const fee = await Fee.findById(req.params.id);
  if (!fee) {
    return res
      .status(404)
      .json({ success: false, message: "Fee not found" });
  }

  fee.status = "Paid";
  await fee.save();

  res.json({ success: true });
};

/* ============== STUDENT: FAKE PAYMENT ============== */
export const fakePayFee = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res
        .status(404)
        .json({ success: false, message: "Fee not found" });
    }

    if (fee.student.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not your fee" });
    }

    if (fee.status === "Paid") {
      return res
        .status(400)
        .json({ success: false, message: "Already paid" });
    }

    fee.status = "Paid";
    await fee.save();

    res.json({
      success: true,
      message: "Payment successful (Fake)",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Payment failed" });
  }
};

/* ============== STUDENT: VIEW OWN FEES (with roomNumber) ============== */
export const getStudentFees = async (req, res) => {
  try {
    const fees = await Fee.find({ student: req.user._id });

    const withRooms = await Promise.all(
      fees.map(async (f) => {
        const allocation = await Request.findOne({
          student: req.user._id,
          status: "accepted",
        }).populate("room", "roomNumber");

        return {
          ...f.toObject(),
          roomNumber: allocation?.room?.roomNumber || null,
        };
      })
    );

    res.json({ success: true, fees: withRooms });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching fees" });
  }
};
