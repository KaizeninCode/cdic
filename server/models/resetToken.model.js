import mongoose from 'mongoose'

const resetTokenSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',},
    code: {type: Number, required: true,},
    createdAt: {type: Date, default: Date.now, expires: 600,},
})

export const ResetToken = mongoose.model('ResetToken', resetTokenSchema)