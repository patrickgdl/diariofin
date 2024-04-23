import { Button } from "@diariofin/ui/button"
import { addMonths, format, formatISO, startOfMonth, subMonths } from "date-fns"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import formatDate from "~/utils/format-date"

type TrackerPaginationProps = {
  numberOfMonths: number
  onChange: (startDate: string) => void
  startDate: Date
}

export function TrackerPagination({ numberOfMonths, onChange, startDate }: TrackerPaginationProps) {
  const selectPrevPeriod = () => {
    onChange(
      formatISO(startOfMonth(subMonths(startDate, numberOfMonths)), {
        representation: "date",
      })
    )
  }

  const selectNextPeriod = () => {
    onChange(
      formatISO(startOfMonth(addMonths(startDate, numberOfMonths)), {
        representation: "date",
      })
    )
  }

  return (
    <div className="flex items-center border rounded-md h-9">
      <Button
        variant="ghost"
        size="icon"
        className="p-0 w-6 h-6 hover:bg-transparent mr-4 ml-2"
        onClick={selectPrevPeriod}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </Button>
      <span className="w-full text-center">
        {formatDate(subMonths(startDate, numberOfMonths), "MMM")} - {formatDate(startDate, "MMM")}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="p-0 w-6 h-6 hover:bg-transparent ml-4 mr-2"
        onClick={selectNextPeriod}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </Button>
    </div>
  )
}
