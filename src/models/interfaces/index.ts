export interface IUser {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  superUser?: boolean
  createdAt?: string
  updatedAt?: string
}

interface IAddress {
  cep: string
  state: string
  neighborhood: string
  street: string
  number: string
  complement: string
  city: string
}

interface IContact {
  phone: string
  whatsapp: string
  instagram?: string
  facebook?: string
  email: string
}

interface IFeedback {
  user: {
    _id: string
    firstName: string
    lastName: string
  }
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
  active?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ICategory {
  name: string
  description: string
}
