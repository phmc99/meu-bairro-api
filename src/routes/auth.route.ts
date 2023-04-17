import { Router } from 'express'
import {
  recoveryPassword,
  superUserLogin,
  userLogin
} from '../controllers/auth.controller'

const router = Router()

export const authRouter = () => {
  router.post('/admin', superUserLogin)
  router.post('/signin', userLogin)
  router.post('/recovery', recoveryPassword)
  return router
}
