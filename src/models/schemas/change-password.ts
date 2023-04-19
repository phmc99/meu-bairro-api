import * as yup from 'yup'

export const changePassSchema = yup.object().shape({
  email: yup.string().required('"email" é um campo obrigatório')
    .email('Formato inválido para "email"'),
  newPassword: yup.string().required('"newPassword" é um campo obrigatório')
    .min(6, '"newPassword" deve ter no mínimo 6 caracteres')
})
