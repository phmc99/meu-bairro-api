import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import AppError from '../errors/app.error'
import logger from '../logger'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'Error',
      message: error.message
    })
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      status: 'Field error',
      fields: error.errors
    })
  }

  logger.error(error)

  return res.status(500).json({
    status: 'General error',
    message: 'Internal server error'
  })
}
