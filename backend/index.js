import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import authRouter from "./routes/auth.js";
import transporter from "./utils/transporter.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors());
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
  res.send("Welcome to the backend server!");
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
