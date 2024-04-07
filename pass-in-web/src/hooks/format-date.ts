import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

export const formatDate = (date: string) => {
  // O newDate() é a data atual para fazer a comparação com o date, pra saber se por exemplo se foi a uma semana, há dois dias...
  return formatRelative(date, new Date(), { locale: ptBR })
}

export const formatDateDayjs = (date: string) => {
  dayjs.extend(relativeTime)
  dayjs.locale('pt-br')

  // return dayjs(date).fromNow()
  // return dayjs(date).toNow()
  return dayjs().to(date)
}
