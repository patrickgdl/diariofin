import { CalendarIcon } from "@radix-ui/react-icons"
import format from "~/utils/format-date"
import * as React from "react"
import { Button } from "~/ui/button"
import { Calendar } from "~/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { cn } from "~/utils/cn"
import { DateRange } from "react-day-picker"

type CalendarDateRangePickerProps = {
  date?: DateRange
  onSelectDate: (date: DateRange) => void
  className?: string
}

export function CalendarDateRangePicker({ date, onSelectDate, className }: CalendarDateRangePickerProps) {
  const handleSelectDate = (newDate?: DateRange) => {
    if (!newDate) {
      return
    }

    onSelectDate(newDate)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[260px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelectDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
