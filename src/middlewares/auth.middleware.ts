import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import AppError from '../errors/app.error'
import { User } from '../models/user.model'

export const isSuperUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (token == null) {
    return res.status(400).json({
      status: 'Error',
      message: 'Cabeçalho "Authorization" inválido'
    })
  }

  jwt.verify(
    token,
    process.env.SECRET as string,
    async (err: any, decoded: any) => {
      try {
        if (err != null) {
          throw new AppError('Token inválido', 401)
        }

        const user = await User.findById(decoded.id)

        if (user == null) {
          throw new AppError('Usuário não encontrado', 404)
        }

        if (user.superUser === false) {
          throw new AppError('Usuário não tem permissão', 403)
        }

        next()
      } catch (error) {
        next(error)
      }
    }
  )
}
