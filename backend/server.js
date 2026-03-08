import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

async function initdb() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(100) NOT NULL,
            title VARCHAR(100) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
        console.log("Database initialized successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

initdb().then(() => {
    console.log(`Server is running on port ${process.env.PORT}`);
}).catch((error) => {
    console.log("Error initializing database", error);
    process.exit(1);
})