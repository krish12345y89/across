import mongoose from "mongoose";
const schema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please enter Name"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please enter email"],
    },
}, { timestamps: true });
export const User = mongoose.model("User ", schema);
