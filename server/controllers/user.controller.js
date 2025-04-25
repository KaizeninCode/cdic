import { User } from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({message: 'User not found.'})
        return res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.userId, req.body, {new: true})
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
    }
}