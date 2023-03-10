import QueryString from 'qs'
import AppError from '../errors/app.error'
import { Commerce } from '../models/commerce.model'
import { ICommerce } from '../models/interfaces'
import { generateDate, paginateData } from '../utils'
import { isCommerceExistent } from '../utils/commerce.util'

interface IListWithFilter {
  page: number
  perPage: number
  // eslint-disable-next-line max-len
  value: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined
}

export const createCommerceService = async (body: ICommerce) => {
  const newCommerce = await Commerce.create(body)

  return newCommerce
}

export const listCommercesService = async (page: number, perPage: number) => {
  const commerces = await Commerce.find()

  return paginateData(commerces, page, perPage)
}

export const listCommercesByCategoryService = async (
  { page, perPage, value }: IListWithFilter
) => {
  const commerces = await Commerce.find({ category: value })
  return paginateData(commerces, page, perPage)
}

export const listCommercesByNeighborhoodService = async (
  { page, perPage, value }: IListWithFilter
) => {
  const commerces = await Commerce.find()

  if (value == null) {
    return paginateData(commerces, page, perPage)
  }

  value = value.toLocaleString().toLowerCase()
  const filtredCommerces = commerces.filter(
    (item) => item.address.neighborhood.toLowerCase() === value
  )

  if (filtredCommerces.length !== 0) {
    return paginateData(filtredCommerces, page, perPage)
  }

  return paginateData(commerces, page, perPage)
}

export const listNewCommercesService = async (
  page: number, perPage: number
) => {
  const commerces = await Commerce.find({})
    .sort({ createdAt: 'asc' })
    .exec()

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
