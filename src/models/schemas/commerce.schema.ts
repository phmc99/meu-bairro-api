import * as yup from 'yup'

export const commerceSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  neighborhood: yup.string().required(),
  address: yup.object({
    cep: yup.string(),
    state: yup.string(),
    street: yup.string(),
    number: yup.string(),
    complement: yup.string(),
    city: yup.string()
  }),
  contact: yup.object({
    phone: yup.string().required(),
    email: yup.string().email().required(),
    whatsapp: yup.string().required(),
    facebook: yup.string(),
    instagram: yup.string()
  }).required()
})
