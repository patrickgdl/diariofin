import { ArrowLeftIcon } from "lucide-react"
import { MenuOption, useCommandStore } from "~/store/command"

export function BackButton() {
  const { setMenu } = useCommandStore()

  return (
    <button
      type="button"
      className="items-center rounded border bg-accent p-1"
      onClick={() => setMenu(MenuOption.Root)}
    >
      <ArrowLeftIcon className="w-4 h-4" />
    </button>
  )
}
