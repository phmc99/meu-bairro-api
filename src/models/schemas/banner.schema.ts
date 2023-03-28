import * as yup from 'yup'

export const bannerSchema = yup.object().shape({
  imgUrl: yup.string().required('"imgUrl" é um campo obrigatório')
})
