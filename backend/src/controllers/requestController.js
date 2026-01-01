import Request from "../models/Request.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

// Student creates room request
export const createRequest = async (req, res) => {
  const { roomId } = req.body;
  if (!roomId) {
    return res.status(400).json({ message: "Room ID required" });
  }

  const exists = await Request.findOne({
    student: req.user._id,
    room: roomId,
    status: { $in: ["pending", "accepted"] },
  });

  if (exists) {
    return res
      .status(400)
      .json({ message: "Request already sent or accepted" });
  }

  const request = await Request.create({
    student: req.user._id,
    room: roomId,
  });
  res.status(201).json(request);
};

// Admin: get all requests
export const getAllRequests = async (req, res) => {
  const requests = await Request.find()
    .populate("student", "name email")
    .populate("room", "roomNumber rent capacity occupied image");
  res.json(requests);
};

// Admin: update request status (accept / reject)
export const updateRequestStatus = async (req, res) => {
  const { status } = req.body;

  const request = await Request.findById(req.params.id)
    .populate("room")
    .populate("student");

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  // ✅ ACCEPT
  if (status === "accepted") {
    const alreadyAccepted = await Request.findOne({
      student: request.student._id,
      status: "accepted",
      _id: { $ne: request._id },
    });

    if (alreadyAccepted) {
      return res
        .status(400)
        .json({ message: "This student already has an allocated room" });
    }

    if (request.room.occupied >= request.room.capacity) {
      return res.status(400).json({ message: "Room full" });
    }

    // room assign
    request.room.occupied += 1;
    await request.room.save();

    await User.findByIdAndUpdate(request.student._id, {
      assignedRoom: request.room._id,
    });
  }

  // ✅ REJECT: sirf tab room & user se hatao jab PEHLE se accepted tha
  if (
    status === "rejected" &&          // abhi jo new status set kar rahe ho
    request.status === "accepted" &&  // pehle se accepted tha
    request.room.occupied > 0
  ) {
    request.room.occupied -= 1;
    await request.room.save();

    await User.findByIdAndUpdate(request.student._id, {
      assignedRoom: null,
    });
  }

  // baaki normal update
  request.status = status;
  await request.save();

  res.json(request);
};


// My allocated room (optional)
export const myRoom = async (req, res) => {
  const request = await Request.findOne({
    student: req.user._id,
    status: "accepted",
  }).populate("room");
  res.json(request);
};
