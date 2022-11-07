import mongoose from 'mongoose'
import { config } from 'dotenv'

config()

const MONGO_URI: string = process.env.MONGO_URI ?? 'mongodb://localhost:27017'

mongoose.connect(MONGO_URI).catch((error) => console.log(error))

export default mongoose
