import { Feedback } from '../models/feedback.model'

export const verifyUserFeedback = async (
  userId: string, commerce: string
) => {
  const feedback = await Feedback.find({ commerce })

  const userFeedback = feedback.find((item) => item.user._id === userId)

  return (userFeedback != null)
}

export const getCommerceRates = async (id: string) => {
  const feedbacks = await Feedback.find({ commerce: id })
  const rates = feedbacks.map((item) => item.rate)
  return rates
}
