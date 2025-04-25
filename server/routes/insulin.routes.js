import express from 'express'
import { protect } from '../middleware/auth.middleware'
import { calculateInsulin } from '../controllers/insulin.controller'

const router = express.Router()

router.post('/calculate', protect, calculateInsulin)

export default router