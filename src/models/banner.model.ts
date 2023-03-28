import { model } from 'mongoose'
import mongoose from '../database'
import { generateDate } from '../utils'
import { IBanner } from './interfaces'

const bannerSchema = new mongoose.Schema<IBanner>(
  {
    imgUrl: { type: String, required: true },
    createdAt: { type: String, default: generateDate() }
  }
)

export const Banner = model<IBanner>('Banner', bannerSchema)
