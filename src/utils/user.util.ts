import { User } from '../models/user.model'

export const isValidPhone = async (phone: string) => {
  const user = await User.findOne({ phone })
  return (user != null)
}

export const isValidEmail = async (email: string) => {
  const user = await User.findOne({ email })
  return (user != null)
}

export const isUserExistent = async (id: string) => {
  const user = await User.findById(id)
  return (user != null)
}
