import { NextFunction, Request, Response } from 'express'

export const createUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req

    console.log(body)

    res.status(201).json({ created: body })
  } catch (error) {
    next(error)
  }
}

export const listUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ users: [] })
  } catch (error) {
    next(error)
  }
}

export const listUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    res.json({ user: id })
  } catch (error) {
    next(error)
  }
}

export const updateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    res.json({ updateUser: id })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    res.json({ deleteUser: id })
  } catch (error) {
    next(error)
  }
}
