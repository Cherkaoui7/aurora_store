import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper to generate JWT Token
const createToken = (id) => {
    return jwt.sign({ id, role: 'customer' }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// Route for User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ success: false, message: "Please enter both valid email and password" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await userModel.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route for User Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password || typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ success: false, message: "Please fill in all required fields with valid text" });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Checking user already exists or not
        const exists = await userModel.findOne({ email: normalizedEmail });
        if (exists) {
            return res.status(400).json({ success: false, message: "A user with this email already exists" });
        }

        // Validating email format
        if (!validator.isEmail(normalizedEmail)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email address" });
        }

        // Validating strong password (min 6 characters)
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route to get User Profile
const getUserProfile = async (req, res) => {
    try {
        if (!req.userId || !mongoose.Types.ObjectId.isValid(req.userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }

        const user = await userModel.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, getUserProfile };
