import { Express } from 'express'
import { categoryRouter } from './category.route'
import { commerceRouter } from './commerce.route'
import { userRouter } from './user.route'

export const initializeRoutes = (app: Express) => {
  app.use('/commerce', commerceRouter())
  app.use('/category', categoryRouter())
  app.use('/user', userRouter())
}
