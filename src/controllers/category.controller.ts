import { NextFunction, Request, Response } from 'express'
import {
  createCategoryService,
  deleteCategoryService,
  listCategoriesService,
  updateCategoryService
} from '../services/category.service'

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body

    const response = await createCategoryService({ name, description })

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const listCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await listCategoriesService()

    res.json({ categories: response })
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { name, description } = req.body

    const response = await updateCategoryService(id, { name, description })

    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const response = await deleteCategoryService(id)

    res.status(204).json(response)
  } catch (error) {
    next(error)
  }
}
