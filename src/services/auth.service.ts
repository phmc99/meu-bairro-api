import AppError from '../errors/app.error'
import { User } from '../models/user.model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const superUserLoginService = async (
  email: string, password: string
) => {
  const user = await User.findOne({ email })

  if (user == null) {
    throw new AppError('Usuário não encontrado', 404)
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError('Email ou Senha incorreta(o)', 401)
  }

  if (user.superUser !== true) {
    throw new AppError('Usuário não tem permissão', 401)
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, isAdm: user.superUser },
    process.env.SECRET as string,
    { expiresIn: '1d' }
  )

  return { token }
}

export const userLoginService = async (
  email: string, password: string
) => {
  const user = await User.findOne({ email })

  if (user == null) {
    throw new AppError('Usuário não encontrado', 404)
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError('Email ou Senha incorreta(o)', 401)
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET as string
  )

  return { token }
}
