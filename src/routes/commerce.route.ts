import { Router } from 'express'
import {
  createCommerce,
  deleteCommerce,
  listCommerceById,
  listCommerces,
  updateCommerce
} from '../controllers/commerce.controller'
import {
  createFeedback,
  deleteFeedback,
  updateFeedback
} from '../controllers/feedback.controller'
import { validate } from '../middlewares/validation.middleware'
import { commerceSchema } from '../models/schemas/commerce.schema'
import { feedbackSchema } from '../models/schemas/feedback.schema'

const router = Router()

export const commerceRouter = () => {
  router.post('', validate(commerceSchema), createCommerce)
  router.get('', listCommerces)
  router.get('/:id', listCommerceById)
  router.patch('/:id', updateCommerce)
  router.delete('/:id', deleteCommerce)
  router.post('/:id/feedback', validate(feedbackSchema), createFeedback)
  router.patch('/:id/feedback', updateFeedback)
  router.delete('/:id/feedback', deleteFeedback)

  return router
}
