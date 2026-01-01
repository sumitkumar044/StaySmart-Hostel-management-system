import Fee from "../models/Fee.js";
import Request from "../models/Request.js";
import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

/**
 * @desc   Student dashboard data (live)
 * @route  GET /api/student/dashboard
 * @access Student
 */
export const studentDashboard = async (req, res, next) => {
  try {
    const studentId = req.user._id;

    // user + assignedRoom
    const user = await User.findById(studentId).populate("assignedRoom");
    const roomNumber = user?.assignedRoom?.roomNumber || null;

    // latest fee record
    const latestFee = await Fee.findOne({ student: studentId })
      .sort({ createdAt: -1 })
      .lean();

    const monthlyFeeAmount = latestFee?.amount || 0;
    const monthlyFeeStatus = latestFee?.status || "N/A";

    // pending complaints count (case-insensitive)
    const pendingComplaints = await Complaint.countDocuments({
      student: studentId,
      status: { $regex: /^pending$/i },
    });

    // latest room request status
    const latestRequest = await Request.findOne({ student: studentId })
      .sort({ createdAt: -1 })
      .lean();

    const myRoomStatus = latestRequest?.status || "N/A";

    res.status(200).json({
      success: true,
      message: "Student Dashboard Data",
      data: {
        roomNumber,
        monthlyFeeAmount,
        monthlyFeeStatus,
        pendingComplaints,
        myRoomStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get logged-in student's fees
 * @route  GET /api/student/fees
 * @access Student
 */
export const getMyFees = async (req, res) => {
  const fees = await Fee.find({ student: req.user._id });
  res.json({ success: true, fees });
};

export const getMyRoom = async (req, res) => {
  const user = await req.user.populate("assignedRoom");
  res.json({
    room: user.assignedRoom,
  });
};
