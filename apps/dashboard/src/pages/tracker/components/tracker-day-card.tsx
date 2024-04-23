import { Avatar, AvatarFallback, AvatarImage } from "@diariofin/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@diariofin/ui/hover-card"
import { cn } from "@diariofin/ui/utils"
import { isSameDay } from "date-fns"
import formatDate, { secondsToHoursAndMinutes } from "~/utils/format-date"

type TrackerDayData = {
  id: string
  project: {
    id: string
    name: string
  }
  assigned: {
    id: string
    full_name: string
    avatar_url: string
  }
  description: string
  duration: number
}

type TrackerDayCardProps = {
  date: Date
  data?: TrackerDayData[]
  outOfRange?: boolean
  onSelect: (data: { day: Date; projectId?: string }) => void
  isActive?: boolean
}

export function TrackerDayCard({ date, data, outOfRange, onSelect, isActive }: TrackerDayCardProps) {
  const handleOnClick = () => {
    onSelect({ day: date, projectId: "new" })
  }

  return (
    <HoverCard openDelay={250} closeDelay={150}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          onClick={handleOnClick}
          className="w-[35px] flex items-center justify-center group relative"
        >
          <div
            className={cn(
              "w-[28px] h-[28px] rounded-full border flex items-center justify-center border-transparent group-hover:border-white",
              isActive && "border-white",
              isSameDay(new Date(), date) && "border-[#878787]/30",
              isSameDay(new Date(), date) && data && "border-[#121212] dark:border-white"
            )}
          >
            <time
              dateTime={new Date(date).toISOString()}
              className="w-[28px] h-[28px] rounded-full border flex items-center justify-center border-transparent group-hover:border-white"
            >
              <div
                className={cn(
                  "w-[20px] h-[20px] rounded-full bg-[#121212]/30 dark:bg-[#878787]/30 group-hover:bg-[#121212] dark:group-hover:bg-white relative",
                  outOfRange && "bg-[#121212]/10 dark:bg-[#878787]/10",
                  isActive && "bg-[#121212] dark:bg-white",
                  isSameDay(new Date(), date) && "bg-[#121212]/30 dark:bg-[#878787]/30",
                  data && "bg-[#121212] dark:bg-white"
                )}
              >
                <span
                  className={cn(
                    "text-[11px] absolute top-7 invisible group-hover:visible w-[50px] text-center -ml-[25px]",
                    isActive && "visible"
                  )}
                >
                  {formatDate(new Date(date), "EEEEEE d")}
                </span>
              </div>
            </time>
          </div>
        </button>
      </HoverCardTrigger>

      <HoverCardContent className="w-[220px] rounded-xl border shadow-sm bg-background p-0" sideOffset={30}>
        <div className="flex border-b-[1px] pl-3 pr-3 py-2.5 items-center">
          <span className="text-xs">Total</span>
        </div>

        <div className="p-3 flex flex-col space-y-3">
          {data?.map((record) => {
            return (
              <div key={record.id} className="flex items-center">
                <div className="flex space-x-2 items-center">
                  <Avatar className="rounded-full w-5 h-5">
                    <AvatarImage src={record?.assigned?.avatar_url} />
                    <AvatarFallback>
                      <span className="text-xs">{record?.assigned?.full_name?.charAt(0)?.toUpperCase()}</span>
                    </AvatarFallback>
                  </Avatar>
                  <button
                    className="flex flex-col"
                    type="button"
                    onClick={() => onSelect({ projectId: record.project.id, day: date })}
                  >
                    <span className="text-xs">{record.project?.name}</span>
                    <span className="text-xs text-[#878787]">{record?.description}</span>
                  </button>
                </div>
                <div className="ml-auto">
                  <span className="text-xs">{secondsToHoursAndMinutes(record.duration)}</span>
                </div>
              </div>
            )
          })}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
