import { model } from 'mongoose'
import mongoose from '../database'
import { generateDate } from '../utils'
import { IFeedback } from './interfaces'

const feedbackSchema = new mongoose.Schema<IFeedback>({
  commerce: { type: String, required: true },
  user: { type: Object, required: true },
  comment: { type: String, required: true, lowercase: true },
  rate: { type: Number, required: true, lowercase: true },
  createdAt: { type: String, default: generateDate() },
  updatedAt: { type: String, default: generateDate() }
})

export const Feedback = model<IFeedback>('Feedback', feedbackSchema)
