import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto"
import bcrypt from "bcrypt";

const studentSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    college: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    year: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    feildOfStudy:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    }

})

const ENCRYPTION_KEY = process.env.EMAIL_ENCRYPTION_KEY ;
const IV = process.env.EMAIL_ENCRYPTION_IV;

const encrypt = function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

const decrypt = function decrypt(text) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

studentSchema.pre("save", function(next) {
    if (!this.isModified("email")) {
        return next();
    }
    this.email = encrypt(this.email);
    next();
});

studentSchema.methods.verifyemail = function(email) {
    const decryptedEmail = decrypt(this.email);
    return decryptedEmail === email;
};

// Encrypt phone number

const Student = mongoose.model("Student", studentSchema)
export {Student , encrypt , decrypt}
