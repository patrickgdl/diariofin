import { BackButton } from "~/components/command-menu/back-button"
import { useCommandStore } from "~/store/command"
import { CommandItem, CommandList } from "~/ui/command"
import { Skeleton } from "~/ui/skeleton"
import { useNavigate } from "react-router-dom"

export function CommandNotifications() {
  let content

  const { setOpen } = useCommandStore()
  // const { notifications, isLoading } = useNotifications()
  const navigate = useNavigate()

  const handleOnSelect = ({ type, recordId }: { type: string; recordId: string }) => {
    setOpen()

    return {
      transaction: navigate(`/transactions?id=${recordId}`),
      inbox: navigate(`/inbox?id=${recordId}`),
      match: navigate(`/transactions?id=${recordId}`),
    }[type]
  }

  if (true) {
    content = [...Array(8)].map((_, index) => (
      <CommandItem key={index.toString()}>
        <Skeleton className="h-3 w-[340px]" />
      </CommandItem>
    ))
  }

  if ([].length) {
    content = [...Array(8)].map((notification) => (
      <CommandItem
        key={notification?.id}
        value={notification?.id}
        onSelect={() => handleOnSelect(notification?.payload)}
      >
        {notification?.payload?.description}
      </CommandItem>
    ))
  }

  return (
    <div className="h-full">
      <div className="p-5 flex items-center space-x-3">
        <BackButton />
        <h2>Últimas Notificações</h2>
      </div>

      <CommandList className="p-2">{content}</CommandList>
    </div>
  )
}
