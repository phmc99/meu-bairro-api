import AppError from '../errors/app.error'
import { Feedback } from '../models/feedback.model'
import { IFeedback } from '../models/interfaces'
import { generateDate } from '../utils'
import { verifyUserFeedback } from '../utils/feedback.util'

interface UpdateBody {
  comment?: string
  rate?: number
}

export const createFeedbackService = async (body: IFeedback) => {
  if (await verifyUserFeedback(body.user._id, body.commerce)) {
    throw new AppError('Usuário já realizou um feedback', 400)
  }

  const newFeedback = await Feedback.create({ ...body })

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

  return updatedFeedback
}

export const deleteFeedbackService = async (feedbackId: string) => {
  await Feedback.findByIdAndRemove(feedbackId)

  return { message: 'Feedback deletado' }
}
