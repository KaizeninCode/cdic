import { InsulinAdjustment } from "../models/insulinAdjustment.model.js";
import { User } from "../models/user.model.js";

export const calculateInsulin = async (req, res) => {
    try {
        const {currentBG} = req.body 
        const user = await User.findById(req.userId)   
        if (!user) return res.status(404).json({message: 'User not found.'})
        if (!user.targetBloodGlucose || !user.prescribedDose) return res.status(400).json({message: 'Insulin regimen incomplete.'})
        
        const diff = currentBG - user.targetBloodGlucose
        const correctionFactor = 3 // 1 unit of insulin lowers BG by 3 mmol/L. to be adjusted based on user data
        const correctionDose = diff / correctionFactor
        const totalDose = user.prescribedDose + correctionDose

        const record = new InsulinAdjustment({
            userId: req.userId,
            currentBG,
            targetBG: user.targetBloodGlucose,
            prescribedDose: user.prescribedDose,
            correctionDose,
            totalDose
        })

        await record.save()
        res.json(record)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server error" });
    }
}