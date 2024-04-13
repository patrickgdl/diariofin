import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
export default function (date: number | Date, formatStr = "PP") {
  return format(date, formatStr, {
    locale: ptBR,
  })
}
