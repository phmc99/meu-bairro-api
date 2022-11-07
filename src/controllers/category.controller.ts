import { NextFunction, Request, Response } from 'express'

export const createCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req

    console.log(body)

    res.status(201).json({ created: body })
  } catch (error) {
    next(error)
  }
}

export const listCategories = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ categories: [] })
  } catch (error) {
    next(error)
  }
}

export const updateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    res.json({ updateCategory: id })
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    res.json({ deleteCategory: id })
  } catch (error) {
    next(error)
  }
}
