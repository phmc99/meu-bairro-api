import { model } from 'mongoose'
import mongoose from '../database'
import { IUser } from './interfaces'
import bcrypt from 'bcryptjs'
import { generateDate } from '../utils'

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    superUser: { type: Boolean, required: true, default: false },
    createdAt: { type: String, default: generateDate() },
    updatedAt: { type: String, default: generateDate() }
  }
)

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

export const User = model<IUser>('User', userSchema)
