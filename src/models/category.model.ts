import { model } from 'mongoose'
import mongoose from '../database'
import { ICategory } from './interfaces'

const categorySchema = new mongoose.Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true }
})

export const Category = model<ICategory>('Category', categorySchema)
