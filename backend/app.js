import express from "express";
import cors from "cors";


const app = app.express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

export {app}