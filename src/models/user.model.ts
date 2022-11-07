import { model } from "mongoose";
import mongoose from "../database";
import { IUser } from "./interfaces";

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    superUser: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
