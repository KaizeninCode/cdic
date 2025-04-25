import twilio from 'twilio'

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export const sendSMS =async (to, body) => {
    return await client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
        body,
    })
}