import "dotenv/config";
import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors({ 
  origin: process.env.FRONTEND_URL, 
  credentials: true 
}));

app.get("/", (req, res) => {
  res.json({ status: "API Gateway is running" });
});

// Route to Auth Service
app.use("/api/auth", createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/auth": ""
  }
}));

// Route to Question Service
app.use("/api/questions", createProxyMiddleware({
  target: process.env.QUESTION_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/questions": ""
  }
}));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});