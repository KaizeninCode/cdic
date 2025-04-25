import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true,},
    lastName: {type: String, required: true,},
    email: {type: String, required: true, unique: true, sparse: true},
    phoneNumber: {type: String, required: true, unique: true, sparse: true},
    password: {type: String, required: true,},
    insulinType: String,
    prescribedDose: Number,
    targetBloodGlucose: Number,
    height: Number,
    weight: Number,
}, {timestamps: true,})

userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export const User = mongoose.model('User', userSchema)