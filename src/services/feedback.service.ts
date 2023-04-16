import AppError from '../errors/app.error'
import { Feedback } from '../models/feedback.model'
import { IFeedback } from '../models/interfaces'
import { generateDate } from '../utils'
import { updateTotalRate } from '../utils/commerce.util'
import { verifyUserFeedback } from '../utils/feedback.util'

interface UpdateBody {
  comment?: string
  rate?: number
}

export const createFeedbackService = async (body: IFeedback) => {
  if (await verifyUserFeedback(body.user._id, body.commerce)) {
    throw new AppError('Você já realizou uma avaliação', 400)
  }

  const newFeedback = await Feedback.create({ ...body })

  await updateTotalRate(body.commerce)

  return newFeedback
}

export const listFeedbacksService = async (commerceId: string) => {
  const feedbacks = await Feedback.find({ commerce: commerceId })

  return { feedbacks }
}

export const updateFeedbackService = async (id: string, body: UpdateBody) => {
  const updatedFeedback = await Feedback.findByIdAndUpdate(id, {
    ...body,
    updatedAt: generateDate(),
    new: true
  }, {
    returnOriginal: false
  })

  if (updatedFeedback != null) {
    await updateTotalRate(updatedFeedback.commerce)
  }

  return updatedFeedback
}

export const deleteFeedbackService = async (feedbackId: string) => {
  const feedback = await Feedback.findByIdAndRemove(feedbackId)

  if (feedback != null) {
    await updateTotalRate(feedback.commerce)
  }

  return { message: 'Avaliação deletada' }
}
