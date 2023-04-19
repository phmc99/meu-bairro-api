import { Router } from 'express'
import {
  changePassword,
  createUser,
  deleteUser,
  listUserById,
  listUsers,
  updateUser,
  verifyToken
} from '../controllers/user.controller'
import { validate } from '../middlewares/validation.middleware'
import { userSchema } from '../models/schemas/user.schema'
import { isUserAuth } from '../middlewares/user-auth.middleware'
import { changePassSchema } from '../models/schemas/change-password'

const router = Router()

export const userRouter = () => {
  router.post('', validate(userSchema), createUser)
  router.get('', listUsers)
  router.post('/token', verifyToken)
  router.post('/password',
    validate(changePassSchema),
    isUserAuth,
    changePassword)
  router.get('/:id', listUserById)
  router.patch('/:id', updateUser)
  router.delete('/:id', deleteUser)

  return router
}
