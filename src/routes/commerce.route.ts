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

const router = Router()

export const commerceRouter = () => {
  router.post('', createCommerce)
  router.get('', listCommerces)
  router.get('/:id', listCommerceById)
  router.patch('/:id', updateCommerce)
  router.delete('/:id', deleteCommerce)
  router.post('/:id/feedback', createFeedback)
  router.patch('/:id/feedback', updateFeedback)
  router.delete('/:id/feedback', deleteFeedback)

  return router
}
