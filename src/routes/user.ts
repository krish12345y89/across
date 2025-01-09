import express from "express";
import {
  newUser ,
  loginUser ,
  forgetPasswordTokenSend,
  forgetPassword,
} from "../controllers/user.js";

const app = express.Router();

// Middleware to parse JSON bodies
app.use(express.json());

// Route - /api/v1/user/new
app.post("/new", newUser );

// Route - /api/v1/user/login
app.post("/login", loginUser );

// Route - /api/v1/user/forget-password-token
app.post("/forget-password-token", forgetPasswordTokenSend);

// Route - /api/v1/user/forget-password
app.post("/forget-password", forgetPassword);

export default app;