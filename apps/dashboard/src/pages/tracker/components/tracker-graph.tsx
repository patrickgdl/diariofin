import formatDate, { secondsToHoursAndMinutes } from "~/utils/format-date"
import { TrackerDayCard } from "./tracker-day-card"
import { TrackerPagination } from "./tracker-pagination"
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  formatISO,
  isAfter,
  isBefore,
  lastDayOfWeek,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns"
import { useSearchParams } from "react-router-dom"

type TrackerGraphProps = {
  data: any
  start: Date
  end: Date
  date: Date
  numberOfMonths: number
  weekStartsOn: 0 | 2 | 1 | 3 | 4 | 5 | 6
}

export function TrackerGraph({ data, start, end, date, numberOfMonths, weekStartsOn }: TrackerGraphProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries([...searchParams])

  const onSelect = (params: any) => {
    setSearchParams(params)
  }

  const onChangeDate = (date: string) => {
    setSearchParams({ date })
  }

  const weeks = eachWeekOfInterval(
    {
      start,
      end,
    },
    { weekStartsOn }
  )

  const months = eachMonthOfInterval({
    start,
    end,
  })

  const days = eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn }),
    end: lastDayOfWeek(date, { weekStartsOn }),
  }).map((day) => formatDate(day, "iii"))

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-8">
        <TrackerPagination
          numberOfMonths={numberOfMonths}
          onChange={onChangeDate}
          startDate={params.date ? parseISO(params.date) : startOfMonth(date)}
        />
      </div>

      <div className="flex gap-2 mt-8 justify-between">
        <div className="flex flex-col justify-between mr-4">
          {days.map((day) => (
            <div className="h-[28px]" key={day}>
              <span className="text-xs text-[#878787]">{day}</span>
            </div>
          ))}
        </div>

        {weeks.map((day) => {
          const daysInWeek = eachDayOfInterval({
            start: startOfWeek(day, { weekStartsOn }),
            end: endOfWeek(day, { weekStartsOn }),
          })

          return (
            <div key={day.toISOString()}>
              <div className="flex flex-col gap-6">
                {daysInWeek.map((dayInWeek) => {
                  const isoDate = formatISO(dayInWeek, {
                    representation: "date",
                  })

                  return (
                    <TrackerDayCard
                      key={isoDate}
                      onSelect={onSelect}
                      date={new Date(isoDate)}
                      data={data && data[isoDate]}
                      outOfRange={isBefore(dayInWeek, start) || isAfter(dayInWeek, end)}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex w-full mt-6 pl-10">
        {months.map((month) => (
          <div key={month.toDateString()} className="basis-1/6 text-center text-[#878787] text-sm">
            {formatDate(month, "MMM")}
          </div>
        ))}
      </div>
    </div>
  )
}
