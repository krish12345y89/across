import express, { NextFunction } from "express";
import { ErrorHandler, errorMiddleware } from "./middlewares/error.js";
import { config } from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.js";
import mongoose from "mongoose";

config();

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017";

const connection = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
  }
};

await connection();

const app = express();

app.use(express.json());

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

// Using Routes
app.use("/api/v1/user", userRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Express is working on http://localhost:${port}`);
});