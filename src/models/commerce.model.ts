import { model } from "mongoose";
import mongoose from "../database";
import { ICommerce } from "./interfaces";

const commerceSchema = new mongoose.Schema<ICommerce>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    address: { type: Object, required: true },
    contact: { type: Object, required: true },
    images: { type: Array, required: true, default: [] },
    logo: { type: String, required: true, default: "" },
    feedbacks: { type: Array, required: true, default: [] },
    active: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

export const Commerce = model<ICommerce>("Commerce", commerceSchema);
