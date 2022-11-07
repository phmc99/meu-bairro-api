import { NextFunction, Request, Response } from 'express'

export const createFeedback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req

    console.log(body)

    res.status(201).json({ createdFeedback: body })
  } catch (error) {
    next(error)
  }
}

export const updateFeedback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    res.json({ updateFeedback: id })
  } catch (error) {
    next(error)
  }
}

export const deleteFeedback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    res.json({ deleteFeedback: id })
  } catch (error) {
    next(error)
  }
}
