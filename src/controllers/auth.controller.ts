import { NextFunction, Request, Response } from 'express'
import { superUserLoginService } from '../services/auth.service'

export const superUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const response = await superUserLoginService(email, password)
    res.json(response)
  } catch (error) {
    next(error)
  }
}
