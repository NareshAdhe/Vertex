import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import transporter from "./utils/transporter.js";

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
transporter
  .verify()
  .then((result) => {
    console.log("Email Server is ready to take our messages", result);
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the Auth Service!");
});

app.use("/", authRouter);
app.use("/admin", adminRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Auth Server is running on http://localhost:${PORT}`);
});
