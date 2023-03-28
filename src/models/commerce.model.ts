import { model } from 'mongoose'
import mongoose from '../database'
import { generateDate } from '../utils'
import { ICommerce } from './interfaces'

const commerceSchema = new mongoose.Schema<ICommerce>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    address: { type: Object },
    neighborhood: { type: String, required: true },
    contact: { type: Object, required: true },
    images: { type: Array, default: [] },
    logo: { type: String, default: '' },
    feedbacks: { type: Array, default: [] },
    totalRate: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    createdAt: { type: String, default: generateDate() },
    updatedAt: { type: String, default: generateDate() }
  }
)

export const Commerce = model<ICommerce>('Commerce', commerceSchema)
