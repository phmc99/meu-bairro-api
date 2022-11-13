import { Commerce } from '../models/commerce.model'

export const isCommerceExistent = async (id: string) => {
  const commerce = await Commerce.findById(id)
  return (commerce != null)
}
