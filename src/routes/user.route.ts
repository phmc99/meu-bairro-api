import { Router } from 'express'
import {
  createUser,
  deleteUser,
  listUserById,
  listUsers,
  updateUser
} from '../controllers/user.controller'

const router = Router()

export const userRouter = () => {
  router.post('', createUser)
  router.get('', listUsers)
  router.get('/:id', listUserById)
  router.patch('/:id', updateUser)
  router.delete('/:id', deleteUser)

  return router
}
