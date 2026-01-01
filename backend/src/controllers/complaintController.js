import Complaint from "../models/Complaint.js";
import Request from "../models/Request.js";
import Room from "../models/Room.js";

/* STUDENT: CREATE */
export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create({
      student: req.user._id,
      title: req.body.title,
      description: req.body.description,
    });

    res.json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ message: "Complaint failed" });
  }
};

/* STUDENT: MY COMPLAINTS */
export const getMyComplaints = async (req, res) => {
  const complaints = await Complaint.find({ student: req.user._id }).sort({
    createdAt: -1,
  });

  res.json({ success: true, complaints });
};

/* ADMIN: ALL COMPLAINTS (with roomNumber) */
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    const withRooms = await Promise.all(
      complaints.map(async (c) => {
        const allocation = await Request.findOne({
          student: c.student._id,
          status: "accepted",
        }).populate("room", "roomNumber");

        return {
          ...c.toObject(),
          roomNumber: allocation?.room?.roomNumber || null,
        };
      })
    );

    res.json({ success: true, complaints: withRooms });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching complaints" });
  }
};

/* ADMIN: UPDATE STATUS */
export const updateComplaintStatus = async (req, res) => {
  const complaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json({ success: true, complaint });
};
