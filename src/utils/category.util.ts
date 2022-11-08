import { Category } from '../models/category.model'

export const isCategoryNameExistent = async (categoryName: string) => {
  const category = await Category.findOne({ name: categoryName })

  return (category != null)
}

export const isCategoryExistent = async (id: string) => {
  const category = await Category.findById(id)

  return (category != null)
}
