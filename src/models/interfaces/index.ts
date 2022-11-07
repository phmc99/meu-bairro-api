export interface IUser {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  superUser: boolean
}

interface IAddress {
  cep: string
  address: string
  district: string
  city: string
  uf: string
  number?: number
  complement?: string
}

interface IContact {
  phone: string
  whatsapp: string
  instagram?: string
  facebook?: string
  email: string
}

interface IFeedback {
  user: IUser
  comment: string
  rate: number
}

export interface ICommerce {
  name: string
  category: string
  address: IAddress
  contact: IContact
  images?: string[]
  logo?: string
  feedbacks?: IFeedback[]
  active: boolean
}

export interface ICategory {
  name: string
  description: string
}
