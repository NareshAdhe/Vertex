import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db";

const app = express();
const PORT = process.env.PORT || 3002;

connectDB();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res) => {
    res.send("Welcome to questionservice!");
})


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT,() => {
  console.log(`Question Server is running on http://localhost:${PORT}`);
})