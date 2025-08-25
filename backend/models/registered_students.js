import mongoose, {Schema} from "mongoose";
import {encrypt} from "./student.js";

const registerd_students = new Schema({
    event_id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

registerd_students.pre("save", function(next) {
    if (!this.isModified("email")) {
        return next();
    }
    this.email = encrypt(this.email);
    next();
});

const RegisteredStudent = mongoose.model("EventRegistration", registerd_students);
export {RegisteredStudent};