import AppError from '../errors/app.error'
import { Banner } from '../models/banner.model'
import { IBanner } from '../models/interfaces'

export const createBannerService = async (body: IBanner) => {
  const banners = await Banner.find()
  if (banners.length >= 8) {
    throw new AppError('Limite maximo de banners atingindo', 400)
  }

  const newBanner = await Banner.create(body)

  return newBanner
}

export const listBannersService = async () => {
  const banners = await Banner.find()

  return banners
}

export const deleteBannerService = async (id: string) => {
  const banner = await Banner.findById(id)

  if (banner == null) {
    throw new AppError('Banner não encontrado', 404)
  }
  await Banner.findByIdAndRemove(id)

  return { message: 'Banner deletado' }
}
