import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// Config ENV
dotenv.config();
connectDB();

// CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:3000", // For local development
    "https://e-commerce-frontend-drei.onrender.com", // Your deployed frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Serve Frontend (React)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
