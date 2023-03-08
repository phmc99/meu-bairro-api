import { NextFunction, Request, Response } from 'express'
import {
  createCommerceService,
  deleteCommerceService,
  listCommerceByIdService,
  listCommercesByCategoryService,
  listCommercesService,
  listNewCommercesService,
  updateCommerceService
} from '../services/commerce.service'

export const createCommerce = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, category, address, contact } = req.body

    const commerceBody = { name, category, address, contact }

    const response = await createCommerceService(commerceBody)

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const listCommerces = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, perPage } = req.query
    const response = await listCommercesService(Number(page), Number(perPage))

    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const listNewCommerces = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, perPage } = req.query
    const response = await listNewCommercesService(
      Number(page), Number(perPage)
    )

    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const listCommercesByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, perPage, category } = req.query
    const response = await listCommercesByCategoryService(
      { page: Number(page), perPage: Number(perPage), category }
    )

    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const listCommerceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const response = await listCommerceByIdService(id)

    res.json({ commerce: response })
  } catch (error) {
    next(error)
  }
}

export const updateCommerce = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const response = await updateCommerceService(id, req.body)

    res.json({ updateCommerce: response })
  } catch (error) {
    next(error)
  }
}

export const deleteCommerce = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const response = await deleteCommerceService(id)

    res.status(204).json(response)
  } catch (error) {
    next(error)
  }
}
