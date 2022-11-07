import AppError from '../errors/app.error'
import { IUser } from '../models/interfaces'
import { User } from '../models/user.model'
import { generateDate } from '../utils'
import { isUserExistent, isValidEmail, isValidPhone } from '../utils/user.util'

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

export const listUsersService = async () => {
  const users = await User.find()

  return users
}

export const listUserByIdService = async (id: string) => {
  const user = await User.findById(id)

  return user
}

export const updateUserService = async (id: string, body: UpdateBody) => {
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
