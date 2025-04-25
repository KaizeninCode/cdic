import express from "express";
import {
  login,
  register,
  requestPasswordReset,
  resetPassword,
  verifyResetCode,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/request-reset", requestPasswordReset);
router.post("/verify-code", verifyResetCode);
router.post("/reset-password", resetPassword);

export default router;
