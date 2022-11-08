import AppError from '../errors/app.error'
import { Category } from '../models/category.model'
import { ICategory } from '../models/interfaces'
import {
  isCategoryExistent,
  isCategoryNameExistent
} from '../utils/category.util'

export const createCategoryService = async (body: ICategory) => {
  if (await isCategoryNameExistent(body.name.toLowerCase())) {
    throw new AppError('Categoria já cadastrada', 400)
  }

  const newCategory = await Category.create(body)

  return newCategory
}

export const listCategoriesService = async () => {
  const categories = await Category.find()

  return categories
}

export const updateCategoryService = async (id: string, body: ICategory) => {
  if (!await isCategoryExistent(id)) {
    throw new AppError('Categoria não encontrada', 404)
  }

  if (body.name == null || body.description == null) {
    throw new AppError(
      'Campos "name" e "description" devem ser informados', 400
    )
  }

  body.name = body.name.toLowerCase()
  body.description = body.description.toLowerCase()

  const updatedCategory = await Category.findByIdAndUpdate(id, {
    ...body,
    new: true
  }, {
    returnOriginal: false
  })

  return updatedCategory
}

export const deleteCategoryService = async (id: string) => {
  if (!await isCategoryExistent(id)) {
    throw new AppError('Categoria não encontrada', 404)
  }
  await Category.findByIdAndRemove(id)

  return { message: 'Categoria deletado' }
}
