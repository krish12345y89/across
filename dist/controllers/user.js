import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createTransport } from "nodemailer";
import { ErrorHandler } from "../middlewares/error.js";
import { config } from "dotenv";
config();
const userEmail = process.env.SENDER_MAIL;
const userPassword = process.env.MAIL_PWD;
export const mailSender = createTransport({
    service: "Gmail",
    auth: {
        user: userEmail,
        pass: userPassword,
    },
});
// Helper function to generate a token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
export const newUser = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password)
            return next(new ErrorHandler("Please add all fields", 400));
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("User with this email already exists", 400));
        }
        ;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword,
        });
        if (newUser) {
            const token = generateToken(newUser);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 5,
            }).status(201).json({
                success: true,
                message: "user signup successfully",
                user: newUser,
                token,
            });
        }
    }
    catch (error) {
        console.error(error);
        next(new ErrorHandler("User  signup failed", 500));
    }
};
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return next(new ErrorHandler("Please provide email and password", 400));
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return next(new ErrorHandler("Invalid email or password", 401));
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return next(new ErrorHandler("Invalid email or password", 401));
        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 1,
        }).status(200).json({
            success: true,
            message: "login successfully",
            user,
            token,
        });
    }
    catch (error) {
        console.error(error);
        next(new ErrorHandler("User  login failed", 500));
    }
};
export const forgetPasswordTokenSend = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email)
            return next(new ErrorHandler("Please provide your email", 400));
        const user = await User.findOne({ email });
        if (!user)
            return next(new ErrorHandler("User  not found", 404));
        // Generate reset token
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });
        const message = `You requested a password reset. Please use this token to copy and paste in the forget password page, please ignore this email. Token: ${resetToken}`;
        try {
            await mailSender.sendMail({
                from: userEmail,
                to: email,
                subject: "Password Reset Request",
                text: message,
            });
            res.status(200).json({
                success: true,
                message: `Password reset email sent to ${email}. Now paste the token with the new password.`,
            });
        }
        catch (err) {
            console.error(err);
            next(new ErrorHandler("Failed to send email", 500));
        }
    }
    catch (error) {
        console.error(error);
        next(new ErrorHandler("Password reset failed", 500));
    }
};
export const forgetPassword = async (req, res, next) => {
    try {
        const { email, token, newPassword } = req.body;
        if (!email || !token || !newPassword) {
            return next(new ErrorHandler("Please provide email, token, and new password", 400));
        }
        const user = await User.findOne({ email });
        if (!user)
            return next(new ErrorHandler("User  not found", 404));
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded)
            return next(new ErrorHandler("Invalid or expired token", 401));
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Update the user's password
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password has been reset successfully",
        });
    }
    catch (error) {
        console.error(error);
        next(new ErrorHandler("Password reset failed", 500));
    }
};
