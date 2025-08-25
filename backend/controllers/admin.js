import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const dataController = {
    createAdmin: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                throw new Error("All fields are required");
            }

            console.log(username);
            const newAdmin = new Admin({ username, email, password });
            await newAdmin.save();

            const token = generateToken(newAdmin._id);
            res.cookie('token', token);
            res.status(201).json({ message: "Admin created successfully", admin: { username: newAdmin.username, email: newAdmin.email } });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    loginAdmin: async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                throw new Error("All fields are required");
            }

            const admin = await Admin.findOne({ username });
            if (!admin) {
                throw new Error("Invalid credentials");
            }

            const result = await bcrypt.compare(password, admin.password);
            if (!result) {
                throw new Error("Invalid credentials");
            }

            const token = generateToken(admin._id);
            res.cookie('token', token);
            res.status(200).json({ message: "Login successful", admin: { username: admin.username, email: admin.email } });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    logoutAdmin: (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: "Logout successful" });
    },

    getAdminProfile: async (req, res) => {
        try {
            const id = req.id;
            const admin = await Admin.findById(id).select('-password');
            if (!admin) {
                throw new Error("Admin not found");
            }

            res.status(200).json({ admin });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export { dataController };
// helpers
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}