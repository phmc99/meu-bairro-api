import { Router } from 'express'
import {
  createUser,
  deleteUser,
  listUserById,
  listUsers,
  updateUser,
  verifyToken
} from '../controllers/user.controller'
import { validate } from '../middlewares/validation.middleware'
import { userSchema } from '../models/schemas/user.schema'

const router = Router()

export const userRouter = () => {
  router.post('', validate(userSchema), createUser)
  router.get('', listUsers)
  router.post('/token', verifyToken)
  router.get('/:id', listUserById)
  router.patch('/:id', updateUser)
  router.delete('/:id', deleteUser)

  return router
}
