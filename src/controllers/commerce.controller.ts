import { NextFunction, Request, Response } from 'express'

export const createCommerce = (
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

export const listCommerces = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ commerces: [] })
  } catch (error) {
    next(error)
  }
}

export const listCommerceById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    res.json({ commerce: id })
  } catch (error) {
    next(error)
  }
}

export const updateCommerce = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    res.json({ updateCommerce: id })
  } catch (error) {
    next(error)
  }
}

export const deleteCommerce = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    res.json({ deleteCommerce: id })
  } catch (error) {
    next(error)
  }
}
