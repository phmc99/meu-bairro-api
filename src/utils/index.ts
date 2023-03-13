import moment from 'moment'

export const generateDate = () => {
  moment.locale('pt-br')
  return moment().format('L')
}

export const paginateData = (data: any, page: number, perPage = 5) => {
  page = page.toString() === 'NaN' ? 1 : page
  perPage = perPage.toString() === 'NaN' ? 5 : perPage

  const lastPage = Math.ceil(data.length / perPage)

  if (page > lastPage) {
    page = lastPage
  }

  const start = (page - 1) * perPage

  const end = start + perPage

  const dataSliced = data.slice(start, end)

  const previousPage =
    page - 1 >= 1 ? page : null
  const nextPage =
    end < data.length ? page : null

  return {
    page,
    per_page: perPage,
    previous_page: previousPage,
    next_page: nextPage,
    last_page: lastPage,
    count: data.length,
    data: dataSliced
  }
}
