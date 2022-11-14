import { Express } from 'express'
import { authRouter } from './auth.route'
import { categoryRouter } from './category.route'
import { commerceRouter } from './commerce.route'
import { userRouter } from './user.route'

export const initializeRoutes = (app: Express) => {
  app.use('/auth', authRouter())
  app.use('/commerce', commerceRouter())
  app.use('/category', categoryRouter())
  app.use('/user', userRouter())
}
