import express from 'express'
import { config } from 'dotenv'
import { errorHandler } from './middlewares/app-error.middleware'
import { initializeRoutes } from './routes'

config()
const app = express()

app.use(express.json())

initializeRoutes(app)

app.use(errorHandler)

export default app
