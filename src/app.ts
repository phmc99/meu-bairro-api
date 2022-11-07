import express from 'express'
import { errorHandler } from './middlewares/app-error.middleware'
import { initializeRoutes } from './routes'

const app = express()

app.use(express.json())

initializeRoutes(app)

app.use(errorHandler)

export default app
