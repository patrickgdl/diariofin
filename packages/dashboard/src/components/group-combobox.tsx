import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "~/utils/cn"
import { Button } from "~/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "~/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"

type GroupComboboxProps = {
  groups: {
    value: string
    label: string
  }[]
  value?: string
  onValueChange: (value: string) => void
  onCreate: (value: string) => void
}

export function GroupCombobox({ groups, onCreate, value, onValueChange }: GroupComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearchValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[220px] justify-between">
          {value ? groups.find((group) => group.value === value)?.label : "Selecionar grupo"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Buscar grupo..." onValueChange={setSearchValue} />
          <CommandEmpty>
            <div className="flex flex-col items-center justify-center space-y-2">
              <span>{search} não encontrado.</span>
              <Button
                variant="outline"
                className="w-[180px]"
                onClick={() => {
                  onCreate(search)
                  setOpen(false)
                }}
              >
                Criar {search}
              </Button>
            </div>
          </CommandEmpty>
          <CommandGroup>
            {groups.map((group) => (
              <CommandItem
                key={group.value}
                value={group.value}
                onSelect={(currentValue) => {
                  onValueChange(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", value === group.value ? "opacity-100" : "opacity-0")} />
                {group.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
