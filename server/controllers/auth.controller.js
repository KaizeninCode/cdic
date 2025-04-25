import { User } from "../models/user.model.js";
import { ResetToken } from "../models/resetToken.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { sendSMS } from "../utils/sendSMS.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email = "", password, phone = "" } = req.body;

    // check if all required fields have been provided
    if (!firstName || !lastName || !password)
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });

    //  check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists)
      return res.status(400).json({ message: "User already exists." });

    // create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    await newUser.save();

    // generate token
    const token = generateToken(newUser._id.toString());

    // send token and user info to client
    res.status(201).json({ newUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    // generate token and send it to client
    const token = generateToken(user._id.toString());
    res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { method, value } = req.body;

    const query =
      method === "email" ? { email: value } : { phoneNumber: value };

    // find user by email or phone number
    const user = await User.findOne(query);
    if (!user) return res.status(404).json({ message: "User not found" });

    // generate 6 digit reset code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // delete any existing reset tokens for the user and create a new one
    await ResetToken.deleteMany({ userId: user._id });
    await ResetToken.create({ userId: user._id, code });

    // send reset token to user via email or SMS
    method === "email"
      ? await sendEmail(
          user.email,
          "Password Reset Code",
          `Your password reset code is ${code}`
        )
      : await sendSMS(user.phoneNumber, `Your password reset code is ${code}`);
    
    res.status(200).json({message: `Reset code sent via ${method}`})

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyResetCode = async (req, res) => {
    try {
        const { userId, code } = req.body;
    
        // find reset token for the user
        const resetToken = await ResetToken.findOne({ userId, code });
        if (!resetToken) return res.status(400).json({ message: "Invalid code" });
    
           
        res.status(200).json({ message: "Code verified successfully. Proceed to reset password." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const {userId, code, newPassword} = req.body

        // find reset token for the user
        const token = await ResetToken.findOne({userId, code})
        if (!token) return res.status(400).json({ message: "Invalid code." });

        //  find user by id
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: "User not found." });

        // update user password
        user.password = newPassword
        await user.save()
        await ResetToken.deleteMany({userId}) // delete the reset token after use
        res.status(200).json({ message: "Password reset successfully. Please log in." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
        
    }
}
