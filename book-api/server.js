import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/books", bookRoutes);

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI;  // Load from .env

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,  // These options should be used for MongoDB 4.x+ drivers
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log("MongoDB Connection Error:", error));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Determine the port dynamically based on environment
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 5001 : 5000);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
