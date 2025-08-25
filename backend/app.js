import express from "express";
import cors from "cors";
import { Student } from "./models/student.js";


const app = express()

app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
  res.send('Backend server is running on localhost!');
});

app.post('/api/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ message: "Student created successfully", student });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export {app}