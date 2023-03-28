import { NextFunction, Request, Response } from 'express'
import {
  createBannerService,
  deleteBannerService,
  listBannersService
} from '../services/banner.service'

export const createBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { imgUrl } = req.body

    const response = await createBannerService({ imgUrl })

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const listBanners = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await listBannersService()

    res.json({ banners: response })
  } catch (error) {
    next(error)
  }
}

export const deleteBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const response = await deleteBannerService(id)

    res.status(204).json(response)
  } catch (error) {
    next(error)
  }
}
