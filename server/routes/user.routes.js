import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", protect, getUserProfile); // protected route
router.post("/update/:id", protect, updateUserProfile); // protected route

export default router;
