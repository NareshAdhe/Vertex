import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import {
  generateTokenAndSetAuthCookie,
  generateTokenAndSetSessionCookie,
} from "../utils/generateTokenAndSetCookie.js";
import { sendOtpEmail, sendWelcomeEmail } from "../utils/sendEmails.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const hashedVerificationToken = await bcrypt.hash(verificationToken, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken: hashedVerificationToken,
      verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000, // 10 Minutes
    });

    await newUser.save();

    //jwt
    generateTokenAndSetSessionCookie(res, newUser._id);
    await sendOtpEmail(
      newUser.email,
      verificationToken,
      "Your Verification Code"
    );

    return res.status(201).json({
      success: true,
      message: "OTP sent successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    let verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const hashedVerificationToken = await bcrypt.hash(verificationToken, 10);
    user.verificationToken = hashedVerificationToken;
    user.verificationTokenExpiresAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    //jwt
    generateTokenAndSetSessionCookie(res, user._id);
    await sendOtpEmail(user.email, verificationToken, "Your Verification Code");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "User logged out successfully." });
};

export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const user = await User.findById(userId);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access - Invalid Token",
      });
    }
    if (Date.now() > user.verificationTokenExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }
    const isOtpValid = await bcrypt.compare(otp, user.verificationToken);
    if (!isOtpValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP. Please try again." });
    }

    //jwt
    generateTokenAndSetAuthCookie(res, userId);
    await sendWelcomeEmail(user.name, user.email);
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetPasswordToken = crypto.randomUUID();
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = Date.now() + 10 * 60 * 1000;
    await user.save();
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`;
    await sendResetEmail(user.email, resetUrl, "Reset Your Password");
    return res.status(200).json({
      success: true,
      message: "Password reset mail sent successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { resetPasswordToken } = req.params;
  try {
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const user = await User.findOne({ resetPasswordToken });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }
    if (Date.now() > user.resetPasswordExpiresAt) {
      return res
        .status(400)
        .json({ success: false, message: "Token has expired" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiresAt = null;
    await user.save();
    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
