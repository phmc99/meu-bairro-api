import { NextFunction, Request, Response } from 'express'
import {
  superUserLoginService,
  userLoginService
} from '../services/auth.service'
import { sendRecoveryEmail } from '../services/mailer.service'

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

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const response = await userLoginService(email, password)
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const recoveryPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body
    await sendRecoveryEmail(email)
    res.json({ message: 'O código foi enviado para o seu e-mail' })
  } catch (error) {
    next(error)
  }
}
