import { SearchIcon } from "lucide-react"
import { useCommandStore } from "~/store/command"
import { Button } from "~/ui/button"

export function DesktopCommandMenuButton() {
  const { setOpen } = useCommandStore()

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full w-8 h-8 flex items-center invisible todesktop:visible"
      onClick={() => setOpen()}
    >
      <SearchIcon size={18} />
    </Button>
  )
}
