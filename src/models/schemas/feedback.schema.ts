import * as yup from 'yup'

export const feedbackSchema = yup.object().shape({
  comment: yup.string().required(),
  rate: yup.number().required(),
  user: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    _id: yup.string().required()
  }).required()
})
