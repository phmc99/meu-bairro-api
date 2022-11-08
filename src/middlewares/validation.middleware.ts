import { NextFunction, Request, Response } from 'express'

export const validate =
  (schema: any) => async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const resource = req.body
    try {
      await schema.validate(resource)
      next()
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.errors.join(', ') })
    }
  }
