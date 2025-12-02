import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import authRouter from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

app.use("/api/auth", authRouter);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});

export default app;
