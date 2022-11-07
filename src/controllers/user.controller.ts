import { NextFunction, Request, Response } from 'express'
import {
  createUserService,
  deleteUserService,
  listUserByIdService,
  listUsersService,
  updateUserService
} from '../services/user.service'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body

    const userBody = { firstName, lastName, email, phone, password }

    const response = await createUserService(userBody)

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await listUsersService()

    res.json({ users: response })
  } catch (error) {
    next(error)
  }
}

export const listUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const response = await listUserByIdService(id)

    res.json({ user: response })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { phone } = req.body

    const response = await updateUserService(id, { phone })

    res.json({ updateUser: response })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const response = await deleteUserService(id)

    res.status(204).json(response)
  } catch (error) {
    next(error)
  }
}
