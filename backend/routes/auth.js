import express from 'express';
import {login,logout,register, verifyOtp} from '../controllers/auth.js';
import { verifySessionToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.post('/logout', logout);

router.post('/verify',verifySessionToken,verifyOtp);

export default router;