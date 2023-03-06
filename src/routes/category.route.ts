import { Router } from 'express'
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory
} from '../controllers/category.controller'
import { isSuperUser } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validation.middleware'
import { categorySchema } from '../models/schemas/category.schema'

const router = Router()

export const categoryRouter = () => {
  router.post('', validate(categorySchema), isSuperUser, createCategory)
  router.get('', listCategories)
  router.patch('/:id', validate(categorySchema), isSuperUser, updateCategory)
  router.delete('/:id', isSuperUser, deleteCategory)

  return router
}
