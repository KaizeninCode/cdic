import mongoose from 'mongoose'

const insulinAdjustmentSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',},
    currentBG: Number,
    targetBG: Number,
    correctionFactor: Number,
    correctionDose: Number,
    totalDose: Number,
    date: {type:Date, default: Date.now},
})

export const InsulinAdjustment = mongoose.model('InsulinAdjustment', insulinAdjustmentSchema)