import { Router } from 'express'
import { superUserLogin } from '../controllers/auth.controller'

const router = Router()

export const authRouter = () => {
  router.post('/admin', superUserLogin)
  return router
}
