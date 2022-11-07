import { Request, Response } from 'express'

import appError from '../errors/app.error'

export const errorHandler = (error: Error, req: Request, res: Response) => {
  if (error instanceof appError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.log(error)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
}
