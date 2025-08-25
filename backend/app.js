import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {Student} from "./models/student.js";
import {RegisteredStudent} from "./models/registered_students.js";
import Event from "./models/event.js";
import { sendConfirmationEmail } from "./utils/mail.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.post('/api/students', async (req, res) => {
    try {
        const { event_id, ...studentData } = req.body;

        // Save student
        const student = new Student(studentData);
        await student.save();

        // Save registration
        const registeredStudent = new RegisteredStudent({
            event_id,
            email: studentData.email
        });
        await registeredStudent.save();

        // Fetch event details9
        const event = await Event.findById(event_id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Send confirmation email
        await sendConfirmationEmail(studentData.email, studentData.fullname, event);

        res.status(201).json({
            message: "Student and registration created successfully. Confirmation email sent.",
            student,
            registeredStudent
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export { app };