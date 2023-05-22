import express from 'express'
import cors from 'cors'

import { errorHandler } from './middlewares/app-error.middleware'
import { initializeRoutes } from './routes'
import { pinoHttpLogger } from './logger'

const app = express()

app.use(express.json())
app.use(cors())
app.use(pinoHttpLogger)

initializeRoutes(app)

app.use(errorHandler)

export default app
