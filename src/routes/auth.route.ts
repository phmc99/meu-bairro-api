import { Router } from 'express'
import { superUserLogin, userLogin } from '../controllers/auth.controller'

const router = Router()

export const authRouter = () => {
  router.post('/admin', superUserLogin)
  router.post('/signin', userLogin)
  return router
}
