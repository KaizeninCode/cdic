import mongoose from 'mongoose'

const carbEntrySchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',},
    foodItem: {type: String, required: true},
    carbs: {type: Number, required: true},
    date: {type: Date, default: Date.now},
})

export const CarbEntry = mongoose.model('CarbEntry', carbEntrySchema)