import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema<IUser >({
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

export const User = mongoose.model<IUser >("User ", schema);