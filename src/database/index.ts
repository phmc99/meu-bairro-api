import mongoose from 'mongoose'
import { config } from 'dotenv'
import logger from '../logger'

config()

const MONGO_URI: string = process.env.MONGO_URI ?? 'mongodb://localhost:27017'

mongoose.connect(MONGO_URI).catch((error) => logger.error(error))

export default mongoose
