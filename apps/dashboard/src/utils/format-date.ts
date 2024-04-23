import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function secondsToHoursAndMinutes(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours) {
    return `${hours}h`
  }

  if (minutes) {
    return `${minutes}m`
  }

  return "0h"
}

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
export default function (date: number | Date, formatStr = "PP") {
  return format(date, formatStr, {
    locale: ptBR,
  })
}
