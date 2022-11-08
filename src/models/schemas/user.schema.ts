import * as yup from 'yup'

export const userSchema = yup.object().shape({
  firstName: yup.string().required('"firstName" é um campo obrigatório'),
  lastName: yup.string().required('"lastName" é um campo obrigatório'),
  email: yup.string().required('"email" é um campo obrigatório')
    .email('Formato inválido para "email"'),
  password: yup.string().required('"password" é um campo obrigatório')
    .min(6, '"password" deve ter no mínimo 6 caracteres'),
  phone: yup.string().required('"phone" é um campo obrigatório')
})
