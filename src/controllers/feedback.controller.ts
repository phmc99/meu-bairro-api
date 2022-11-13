import { NextFunction, Request, Response } from 'express'
import {
  createFeedbackService,
  deleteFeedbackService,
  listFeedbacksService,
  updateFeedbackService
} from '../services/feedback.service'

export const createFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, comment, rate } = req.body
    const { id } = req.params

    const body = { user, comment, rate }

    const response = await createFeedbackService({ ...body, commerce: id })

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const listFeedbacks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const response = await listFeedbacksService(id)

    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const updateFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { comment, rate } = req.body

    const response = await updateFeedbackService(id, { comment, rate })

    res.json({ updateFeedback: response })
  } catch (error) {
    next(error)
  }
}

export const deleteFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const response = await deleteFeedbackService(id)

    res.status(204).json(response)
  } catch (error) {
    next(error)
  }
}
