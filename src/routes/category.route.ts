import { Router } from 'express'
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory
} from '../controllers/category.controller'
import { validate } from '../middlewares/validation.middleware'
import { categorySchema } from '../models/schemas/category.schema'

const router = Router()

export const categoryRouter = () => {
  router.post('', validate(categorySchema), createCategory)
  router.get('', listCategories)
  router.patch('/:id', validate(categorySchema), updateCategory)
  router.delete('/:id', deleteCategory)

  return router
}
