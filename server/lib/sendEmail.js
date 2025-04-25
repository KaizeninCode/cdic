import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
})

export const sendEmail = async (to, subject, string) => {
    await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject,
        text: string,
    })
}