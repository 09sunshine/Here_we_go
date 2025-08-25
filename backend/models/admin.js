import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const salt = await bcrypt.genSalt(13);

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;