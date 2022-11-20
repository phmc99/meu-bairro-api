import express from 'express'
import { errorHandler } from './middlewares/app-error.middleware'
import { initializeRoutes } from './routes'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

initializeRoutes(app)

app.use(errorHandler)

export default app
