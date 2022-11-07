import { Router } from 'express'
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory
} from '../controllers/category.controller'

const router = Router()

export const categoryRouter = () => {
  router.post('', createCategory)
  router.get('', listCategories)
  router.patch('/:id', updateCategory)
  router.delete('/:id', deleteCategory)

  return router
}
