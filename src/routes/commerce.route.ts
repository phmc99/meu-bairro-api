import { Router } from 'express'
import {
  createCommerce,
  deleteCommerce,
  listBestRatedCommerces,
  listCommerceById,
  listCommerces,
  listCommercesByCategory,
  listCommercesByNeighborhood,
  listCommercesBySearch,
  listNewCommerces,
  updateCommerce
} from '../controllers/commerce.controller'
import {
  createFeedback,
  deleteFeedback,
  listFeedbacks
} from '../controllers/feedback.controller'
import { isSuperUser } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validation.middleware'
import { commerceSchema } from '../models/schemas/commerce.schema'
import { feedbackSchema } from '../models/schemas/feedback.schema'
import { isUserAuth } from '../middlewares/user-auth.middleware'

const router = Router()

export const commerceRouter = () => {
  router.post('', validate(commerceSchema), isSuperUser, createCommerce)
  router.get('', listCommerces)
  router.get('/category', listCommercesByCategory)
  router.get('/neighborhood', listCommercesByNeighborhood)
  router.get('/new', listNewCommerces)
  router.get('/bestrated', listBestRatedCommerces)
  router.get('/search', listCommercesBySearch)
  router.get('/:id', listCommerceById)
  router.patch('/:id', isSuperUser, updateCommerce)
  router.delete('/:id', isSuperUser, deleteCommerce)
  router.post(
    '/:id/feedback', isUserAuth, validate(feedbackSchema), createFeedback
  )
  router.get('/:id/feedback', listFeedbacks)
  // router.patch('/feedback/:id', isUserAuth, updateFeedback)
  router.delete('/feedback/:id', isUserAuth, deleteFeedback)

  return router
}
