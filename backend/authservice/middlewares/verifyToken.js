import jwt from "jsonwebtoken";

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