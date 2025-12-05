import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -verificationToken -resetPasswordToken");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ success: false, message: "Invalid role" });
  }

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if(user.email === process.env.SENDER_MAIL){
        return res.status(403).json({success:false,message: "This action is not allowed"});
    }
    user.role = role;
    await user.save();
    res.status(200).json({ success: true, message: "User role updated", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.email === process.env.SENDER_MAIL) {
      return res.status(403).json({ success: false, message: "Cannot delete the super admin" });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
