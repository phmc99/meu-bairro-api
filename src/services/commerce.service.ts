import QueryString from 'qs'
import AppError from '../errors/app.error'
import { Commerce } from '../models/commerce.model'
import { ICommerce } from '../models/interfaces'
import { generateDate, paginateData } from '../utils'
import { listFeedbacksService } from './feedback.service'

interface IListWithFilter {
  page: number
  perPage: number
  // eslint-disable-next-line max-len
  value?: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined
  // eslint-disable-next-line max-len
  neighborhood?: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined

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
  { page, perPage, value, neighborhood }: IListWithFilter
) => {
  const commerces = await Commerce.find({ category: value })

  if (neighborhood == null ||
    neighborhood.toLocaleString().trim() === '') {
    return paginateData(commerces, page, perPage)
  }

  neighborhood = neighborhood.toLocaleString()
  const filtredCommerces = commerces.filter(
    (item) => item.neighborhood === neighborhood
  )

  const filterOthers = commerces.filter(
    (item) => item.neighborhood !== neighborhood
  )

  return paginateData([...filtredCommerces, ...filterOthers], page, perPage)
}

export const listCommercesByNeighborhoodService = async (
  { page, perPage, value }: IListWithFilter
) => {
  const commerces = await Commerce.find()

  if (value == null) {
    return paginateData(commerces, page, perPage)
  }

  value = value.toLocaleString()
  const filtredCommerces = commerces.filter(
    (item) => item.neighborhood === value
  )

  if (filtredCommerces.length !== 0) {
    return paginateData(filtredCommerces, page, perPage)
  }

  return paginateData(commerces, page, perPage)
}

export const listNewCommercesService = async (
  { page, perPage, neighborhood }: IListWithFilter
) => {
  const commerces = await Commerce.find({})
    .sort({ createdAt: 'desc' })
    .exec()

  if (neighborhood == null ||
    neighborhood.toLocaleString().trim() === '') {
    return paginateData(commerces, page, perPage)
  }

  const filtredCommerces = commerces.filter(
    (item) => item.neighborhood === neighborhood
  )

  const filterOthers = commerces.filter(
    (item) => item.neighborhood !== neighborhood
  )

  return paginateData([...filtredCommerces, ...filterOthers], page, perPage)
}

export const listBestRatedCommercesService = async (
  { page, perPage, neighborhood }: IListWithFilter
) => {
  const commerces = await Commerce.find({})
    .sort({ totalRate: 'desc' })
    .exec()

  if (neighborhood == null ||
    neighborhood.toLocaleString().trim() === '') {
    return paginateData(commerces, page, perPage)
  }

  const filtredCommerces = commerces.filter(
    (item) => item.neighborhood === neighborhood
  )

  const filterOthers = commerces.filter(
    (item) => item.neighborhood !== neighborhood
  )

  return paginateData([...filtredCommerces, ...filterOthers], page, perPage)
}

export const listCommerceByIdService = async (id: string) => {
  const commerce = await Commerce.findById(id)

  if (commerce == null) {
    throw new AppError('Comércio não encontrado', 404)
  }

  const { feedbacks } = await listFeedbacksService(id)

  if (feedbacks != null) {
    commerce.feedbacks = feedbacks
  }

  return commerce
}

export const listBySearchTerm = async (
  { page, perPage, value }: IListWithFilter
) => {
  const commerces = await Commerce.find({})

  if (value != null) {
    const term = value.toLocaleString().toLowerCase()
    const filteredCommerces = commerces.filter(
      item => {
        const name = item.name.toLowerCase()
        const description = item.description.toLowerCase()
        if (name.includes(term) || description.includes(term)) {
          return item
        }
        return false
      }
    )
    console.log(filteredCommerces)
    return paginateData(filteredCommerces, page, perPage)
  }

  return paginateData([], page, perPage)
}

export const updateCommerceService = async (id: string, body: object) => {
  const updatedCommerce = await Commerce.findByIdAndUpdate(id, {
    ...body,
    updatedAt: generateDate(),
    new: true
  }, {
    returnOriginal: false
  })

  if (updatedCommerce == null) {
    throw new AppError('Comércio não encontrado', 404)
  }

  return updatedCommerce
}

export const deleteCommerceService = async (id: string) => {
  const deletedCommerce = await Commerce.findByIdAndRemove(id)

  if (deletedCommerce == null) {
    throw new AppError('Comércio não encontrado', 404)
  }

  return { message: 'Comércio deletado' }
}
