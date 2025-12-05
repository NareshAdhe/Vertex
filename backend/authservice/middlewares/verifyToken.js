import jwt from "jsonwebtoken";
import {User} from "../models/user.js"

export const verifySessionToken = async (req, res, next) => {
  const sessionToken = req.cookies.sessionToken;
  if (!sessionToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  }
  try {
    const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};