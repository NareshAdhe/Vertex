import express from "express";
import {
  login,
  logout,
  register,
  verifyOtp,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.js";
import { verifySessionToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.post("/verify", verifySessionToken, verifyOtp);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:resetPasswordToken", resetPassword);

export default router;
