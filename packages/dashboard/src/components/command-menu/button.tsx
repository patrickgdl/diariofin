import { SearchIcon } from "lucide-react"
import { useCommandStore } from "~/store/command"
import { Button } from "~/ui/button"

export function CommandMenuButton() {
  const { setOpen } = useCommandStore()

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen()}
        className="relative justify-start text-sm text-muted-foreground shadow-none sm:pr-12 w-60 border-0 p-0 hover:bg-transparent font-normal hidden md:flex"
      >
        <span className="hidden lg:inline-flex">Busque ou navegue</span>
        <kbd className="pointer-events-none absolute right-1.5 top-[8px] hidden h-5 select-none items-center gap-1 rounded border bg-accent px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">ctrl</span>+ K
        </kbd>
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="rounded-full w-8 h-8 items-center md:hidden"
        onClick={() => setOpen()}
      >
        <SearchIcon size={18} />
      </Button>
    </>
  )
}
