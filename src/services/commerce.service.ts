import AppError from '../errors/app.error'
import { Commerce } from '../models/commerce.model'
import { ICommerce } from '../models/interfaces'
import { generateDate, paginateData } from '../utils'
import { isCommerceExistent } from '../utils/commerce.util'

export const createCommerceService = async (body: ICommerce) => {
  const newCommerce = await Commerce.create(body)

  return newCommerce
}

export const listCommercesService = async (page: number, perPage: number) => {
  const commerces = await Commerce.find()

  return paginateData(commerces, page, perPage)
}

export const listCommerceByIdService = async (id: string) => {
  if (!await isCommerceExistent(id)) {
    throw new AppError('Comércio não encontrado', 404)
  }

  const commerce = await Commerce.findById(id)

  return commerce
}

export const updateCommerceService = async (id: string, body: object) => {
  if (!await isCommerceExistent(id)) {
    throw new AppError('Comércio não encontrado', 404)
  }

  const updatedCommerce = await Commerce.findByIdAndUpdate(id, {
    ...body,
    updatedAt: generateDate(),
    new: true
  }, {
    returnOriginal: false
  })

  return updatedCommerce
}

export const deleteCommerceService = async (id: string) => {
  if (!await isCommerceExistent(id)) {
    throw new AppError('Comércio não encontrado', 404)
  }
  await Commerce.findByIdAndRemove(id)

  return { message: 'Comércio deletado' }
}
