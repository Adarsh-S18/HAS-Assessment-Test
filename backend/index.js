import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import recordRoute from './Routes/recordRoute.js'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

dotenv.config()

// Connection for MONGODB

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("Database Connected !");
    }).catch((error) => {
        console.log("Error connecting to database:", error);
    });

// Middlewares

app.use(express.json()) 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use("/movies" , recordRoute)

// Backend PORT connection

app.listen(5000, () => {
    console.log("Backend Server is Running");
});
