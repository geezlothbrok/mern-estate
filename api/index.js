import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

// Connect to MongoDB using the connection string from environment variables
// The connection string should be stored in a .env file for security reasons
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });


  // Create a new connection with options
  // This is useful when you want to set specific options for the connection
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  };
  mongoose.connect(process.env.MONGO, options)
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data (form submissions)
app.use(cookieParser());

// Middleware to parse cookies from incoming requests
app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

app.use("/api/user", userRouter); // user routes
app.use("/api/auth", authRouter); // auth routes
app.use("/api/listing", listingRouter); // listing routes

//middle ware for error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
