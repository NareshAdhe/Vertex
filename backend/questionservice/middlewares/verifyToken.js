import jwt from "jsonwebtoken"


export const verifyToken = async (req, res, next) => {
  const authToken = req.cookies.authToken;
  if (!authToken) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Access" });
  }
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decoded; // Contains userId, branch, year, semester
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
