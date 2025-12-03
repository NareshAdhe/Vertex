import jwt from "jsonwebtoken";

export const generateTokenAndSetSessionCookie = (res, userId) => {
  try {
    const sessionToken = jwt.sign(
      { userId: userId.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("sessionToken", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generateTokenAndSetAuthCookie = (res, user) => {
  try {
    const authToken = jwt.sign(
      {
        userId: user._id.toString(),
        branch: user.branch,
        year: user.year,
        semester: user.semester,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
