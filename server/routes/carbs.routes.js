import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getCarbEntries,
  addCarbEntry,
} from "../controllers/carb.controller.js";

const router = express.Router()

router.get('/carbs', protect, getCarbEntries)
router.post('/carbs/add', protect, addCarbEntry)

export default router