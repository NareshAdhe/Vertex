import express from "express";
import { getAllUsers, updateUserRole, deleteUser } from "../controllers/admin.js";
import { verifySessionToken, verifyAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();

// All routes require authentication and admin privileges
router.use(verifySessionToken, verifyAdmin);

router.get("/users", getAllUsers);
router.put("/users/:userId/role", updateUserRole);
router.delete("/users/:userId", deleteUser);

export default router;
