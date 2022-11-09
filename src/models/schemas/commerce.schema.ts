import * as yup from 'yup'

export const commerceSchema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().required(),
  address: yup.object({
    cep: yup.string().required(),
    state: yup.string().required(),
    neighborhood: yup.string().required(),
    street: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string().required(),
    city: yup.string().required()
  }).required(),
  contact: yup.object({
    phone: yup.string().required(),
    email: yup.string().email().required(),
    whatsapp: yup.string().required(),
    facebook: yup.string(),
    instagram: yup.string()
  }).required()
})
