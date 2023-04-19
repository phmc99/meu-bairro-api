import AppError from '../errors/app.error'
import { IUser } from '../models/interfaces'
import { User } from '../models/user.model'
import { generateDate, paginateData } from '../utils'
import { isUserExistent, isValidEmail, isValidPhone } from '../utils/user.util'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

interface UpdateBody {
  phone: string
}

export const createUserService = async (body: IUser) => {
  if (await isValidPhone(body.phone)) {
    throw new AppError('Telefone já cadastrado', 400)
  }

  if (await isValidEmail(body.email)) {
    throw new AppError('Email já cadastrado', 400)
  }

  const newUser = await User.create(body)

  return newUser
}

export const listUsersService = async (page: number, perPage: number) => {
  const users = await User.find()

  return paginateData(users, page, perPage)
}

export const listUserByIdService = async (id: string) => {
  if (!await isUserExistent(id)) {
    throw new AppError('Usuário não encontrado', 400)
  }

  const user = await User.findById(id)

  return user
}

export const updateUserService = async (id: string, body: UpdateBody) => {
  if (!await isUserExistent(id)) {
    throw new AppError('Usuário não encontrado', 400)
  }

  if (body.phone == null) {
    throw new AppError('Campo "phone" não informado', 400)
  }

  if (await isValidPhone(body.phone)) {
    throw new AppError('Telefone já cadastrado', 400)
  }

  const updatedUser = await User.findByIdAndUpdate(id, {
    ...body,
    updatedAt: generateDate(),
    new: true
  }, {
    returnOriginal: false
  })

  return updatedUser
}

export const deleteUserService = async (id: string) => {
  if (!await isUserExistent(id)) {
    throw new AppError('Usuário não encontrado', 400)
  }
  await User.findByIdAndRemove(id)

  return { message: 'Usuário deletado' }
}

export const verifyTokenService = async (token: string) => {
  if (token == null) {
    return { isValid: false }
  }

  const verify = jwt.verify(
    token,
    process.env.SECRET as string,
    async (err: any, decoded: any) => {
      try {
        if (err != null) {
          return { isValid: false }
        }

        const user = await User.findById(decoded.id)

        if (user == null) {
          return { isValid: false }
        }

        return { isValid: true }
      } catch (error) {
        return { isValid: false }
      }
    }
  )

  return verify
}

export const changePasswordService = async (
  email: string, newPassword: string
) => {
  const user = await User.findOne({ email })

  if (user == null) {
    throw new AppError('Usuário não encontrado', 404)
  }

  newPassword = await bcrypt.hash(newPassword, 10)

  await User.findByIdAndUpdate(user._id, {
    password: newPassword,
    updatedAt: generateDate(),
    new: true
  })

  return { message: 'Senha alterada com sucesso!' }
}
