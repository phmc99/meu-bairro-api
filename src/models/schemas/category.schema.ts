import * as yup from 'yup'

export const categorySchema = yup.object().shape({
  name: yup.string().required('"name" é um campo obrigatório'),
  description: yup.string().required('"description" é um campo obrigatório')
})
