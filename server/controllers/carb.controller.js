import { CarbEntry } from "../models/carbEntry.model.js";

export const addCarbEntry = async (req, res) => {
    try {
        const { date, carbs } = req.body;
        const newEntry = new CarbEntry({ date, carbs });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export const getCarbEntries = async (req, res) => {
    try {
        const entries = await CarbEntry.find({userId: req.userId});
        res.status(200).json(entries);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}
