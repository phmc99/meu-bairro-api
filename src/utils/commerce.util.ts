import { generateDate } from '.'
import { Commerce } from '../models/commerce.model'
import { getCommerceRates } from './feedback.util'

export const updateTotalRate = async (id: string) => {
  const rates: number[] = await getCommerceRates(id)

  let totalRate: number

  if (rates.length === 0) {
    totalRate = 0
  } else {
    totalRate = rates.reduce((acc, item) => acc + item, 0) / rates.length
  }

  await Commerce.findByIdAndUpdate(id, {
    totalRate,
    updatedAt: generateDate(),
    new: true
  })
}
