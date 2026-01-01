import Fee from "../models/Fee.js";
import Room from "../models/Room.js";
import User from "../models/User.js";
import Request from "../models/Request.js";
import Complaint from "../models/Complaint.js";

export const adminDashboard = async (req, res, next) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalRooms = await Room.countDocuments();

    // 🔹 Pending fees (Pending / pending / PENDING sab chalega)
    const pendingFeesAgg = await Fee.aggregate([
      {
        $addFields: {
          statusLower: { $toLower: "$status" },
        },
      },
      {
        $match: { statusLower: "pending" },
      },
      {
        $group: { _id: null, total: { $sum: "$amount" } },
      },
    ]);

    // 🔹 Pending room requests (case-insensitive)
    const pendingRequests = await Request.countDocuments({
      status: { $regex: /^pending$/i },
    });

    // 🔹 Open complaints = status pending (case-insensitive)
    const openComplaints = await Complaint.countDocuments({
      status: { $regex: /^pending$/i },
    });

    res.status(200).json({
      success: true,
      message: "Admin Dashboard Data",
      data: {
        totalStudents,
        totalRooms,
        pendingFees: pendingFeesAgg[0]?.total || 0,
        pendingRequests,
        openComplaints,
      },
    });
  } catch (error) {
    next(error);
  }
};

// niche wala getAllStudentsSummary jaisa hai waisa hi rehne do
// export const getAllStudentsSummary = async (req, res) => {
//   try {
//     const allocations = await Request.find({ status: "accepted" })
//       .populate("student", "name email phone")
//       .populate("room", "roomNumber");

//     const map = new Map();

//     for (const a of allocations) {
//       if (!a.student) continue;
//       const key = a.student._id.toString();

//       if (!map.has(key)) {
//         map.set(key, {
//           studentId: key,
//           name: a.student.name,
//           email: a.student.email,
//           phone: a.student.phone,
//           roomNumber: a.room?.roomNumber || null,
//           totalFees: 0,
//           totalComplaints: 0,
//         });
//       }
//     }

//     const students = Array.from(map.values());

//     const feeAgg = await Fee.aggregate([
//       { $group: { _id: "$student", count: { $sum: 1 } } },
//     ]);

//     const compAgg = await Complaint.aggregate([
//       { $group: { _id: "$student", count: { $sum: 1 } } },
//     ]);

//     const feeMap = new Map(feeAgg.map((f) => [f._id.toString(), f.count]));
//     const compMap = new Map(compAgg.map((c) => [c._id.toString(), c.count]));

//     students.forEach((s) => {
//       s.totalFees = feeMap.get(s.studentId) || 0;
//       s.totalComplaints = compMap.get(s.studentId) || 0;
//     });

//     res.json({ success: true, students });
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ success: false, message: "Error fetching students summary" });
//   }
// };

export const deleteStudentCompletely = async (req, res, next) => {
  try {
    const studentId = req.params.id;

    // 1) user exist?
    const user = await User.findById(studentId);
    if (!user || user.role !== "student") {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // 2) Delete related docs
    await Fee.deleteMany({ student: studentId });
    await Complaint.deleteMany({ student: studentId });
    await Request.deleteMany({ student: studentId });

    // 3) Finally delete user
    await User.findByIdAndDelete(studentId);

    res.json({ success: true, message: "Student and related data deleted" });
  } catch (err) {
    next(err);
  }
};



export const getAllStudentsSummary = async (req, res) => {
  try {
    // Populate mein phone, mobile, contact teeno mangwa lo safety ke liye
    const allocations = await Request.find({ status: "accepted" })
      .populate("student", "name email phone mobile contact") 
      .populate("room", "roomNumber");

    const map = new Map();

    for (const a of allocations) {
      if (!a.student) continue;
      const key = a.student._id.toString();

      if (!map.has(key)) {
        map.set(key, {
          studentId: key,
          name: a.student.name,
          email: a.student.email,
          // Yaha hum backend se hi 'phone' property ko fix karke bhej rahe hain
          phone: a.student.phone || a.student.mobile || a.student.contact || "N/A",
          roomNumber: a.room?.roomNumber || "Not Set",
          totalFees: 0,
          totalComplaints: 0,
        });
      }
    }

    const students = Array.from(map.values());

    const feeAgg = await Fee.aggregate([{ $group: { _id: "$student", count: { $sum: 1 } } }]);
    const compAgg = await Complaint.aggregate([{ $group: { _id: "$student", count: { $sum: 1 } } }]);

    const feeMap = new Map(feeAgg.map((f) => [f._id?.toString(), f.count]));
    const compMap = new Map(compAgg.map((c) => [c._id?.toString(), c.count]));

    students.forEach((s) => {
      s.totalFees = feeMap.get(s.studentId) || 0;
      s.totalComplaints = compMap.get(s.studentId) || 0;
    });

    res.json({ success: true, students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching students summary" });
  }
};