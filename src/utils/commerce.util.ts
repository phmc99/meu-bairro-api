import { generateDate } from '.'
import { Commerce } from '../models/commerce.model'
import { getCommerceRates } from './feedback.util'

export const isCommerceExistent = async (id: string) => {
  const commerce = await Commerce.findById(id)
  return (commerce != null)
}

export const updateTotalRate = async (id: string) => {
  const rates = await getCommerceRates(id)
  const totalRate = rates.reduce((acc, item) => acc + item, 0) / rates.length

  await Commerce.findByIdAndUpdate(id, {
    totalRate,
    updatedAt: generateDate(),
    new: true
  })
}
