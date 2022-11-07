import moment from 'moment'

export const generateDate = () => {
  moment.locale('pt-br')
  return moment().format('L')
}
