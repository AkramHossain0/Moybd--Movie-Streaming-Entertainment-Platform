import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        global.verificationCodes = global.verificationCodes || {};
        global.verificationCodes[email] = { code: verificationCode, name, hashedPassword };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification Code',
            text: `Your verification code is: ${verificationCode}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Verification code sent to email' });
    } catch (error) {
        console.error('Error during registration', error);
        res.status(500).json({ error: 'Error during registration' });
    }
};

const verify = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        if (!email || !verificationCode) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (global.verificationCodes && global.verificationCodes[email] && global.verificationCodes[email].code === verificationCode) {
            const { name, hashedPassword } = global.verificationCodes[email];

            delete global.verificationCodes[email];

            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword,
            });

            await newUser.save();

            res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
        } else {
            res.status(400).json({ success: false, message: 'Invalid verification code' });
        }
    } catch (error) {
        console.error('Error during verification', error);
        res.status(500).json({ error: 'Error during verification' });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, findUser.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ userId: findUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ success: true, message: 'User logged in successfully', user: findUser });
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ error: 'Error during login' });
    }
};


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

        global.resetCodes = global.resetCodes || {};
        global.resetCodes[email] = resetCode;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Code',
            text: `You requested a password reset. Your reset code is: ${resetCode}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Password reset code sent to email' });
    } catch (error) {
        console.error('Error during forgot password', error);
        res.status(500).json({ error: 'Error during forgot password' });
    }
};


export { Register, Login, verify, forgotPassword };