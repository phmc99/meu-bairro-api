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
  listFeedbacks,
  updateFeedback
} from '../controllers/feedback.controller'
import { isSuperUser } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validation.middleware'
import { commerceSchema } from '../models/schemas/commerce.schema'
import { feedbackSchema } from '../models/schemas/feedback.schema'

const router = Router()

export const commerceRouter = () => {
  router.use(isSuperUser)
  router.post('', validate(commerceSchema), createCommerce)
  router.get('', listCommerces)
  router.get('/:id', listCommerceById)
  router.patch('/:id', updateCommerce)
  router.delete('/:id', deleteCommerce)
  router.post('/:id/feedback', validate(feedbackSchema), createFeedback)
  router.get('/:id/feedback', listFeedbacks)
  router.patch('/feedback/:id', updateFeedback)
  router.delete('/feedback/:id', deleteFeedback)

  return router
}
