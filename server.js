import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import formidable from "express-formidable";
import bodyParser from "body-parser";
//config ENV
dotenv.config();
//database config

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Your frontend's origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Headers to allow
  credentials: true, // Allow cookies if needed
};
connectDB();

//middleware

const app = express(); // rest object
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(express.json());
// app.use(formidable());
app.use(cors());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to E-Commerce App</h1>");
});

//
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
