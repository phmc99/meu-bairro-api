import { Router } from 'express'
import {
  createBanner,
  deleteBanner,
  listBanners
} from '../controllers/banner.controller'

import { isSuperUser } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validation.middleware'
import { bannerSchema } from '../models/schemas/banner.schema'

const router = Router()

export const bannerRouter = () => {
  router.post('', validate(bannerSchema), isSuperUser, createBanner)
  router.get('', listBanners)
  router.delete('/:id', isSuperUser, deleteBanner)

  return router
}
