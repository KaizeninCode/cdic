import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import job from './lib/cron.js'
import { connectDB } from './db/dbConn.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3500;

job.start()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => (
    connectDB()
        .then(() => console.log('Connected to DB'))
        .catch((error) => console.log('Error connecting to DB: ' + error)),
    console.log(`Server is running on port ${PORT}`)
))