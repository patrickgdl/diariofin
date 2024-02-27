import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import useAppContext from "~/hooks/useAppContext"
import { Account } from "~/types/account"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Button } from "~/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { cn } from "~/utils/cn"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger> & {
  isCollapsed?: boolean
  accounts: Account[]
  classNames?: string | undefined
}

interface AccountSwitcherProps extends PopoverTriggerProps {}

export default function AccountSwitcher({ isCollapsed = false, accounts, classNames }: AccountSwitcherProps) {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)

  const { selectedAccount } = useAppContext()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          variant="outline"
          aria-expanded={open}
          aria-label="Selecione uma conta"
          className={cn("w-full justify-between", classNames)}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage src={`https://avatar.vercel.sh/${selectedAccount.id}.png`} alt={selectedAccount.name || ""} />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {!isCollapsed ? selectedAccount.name : ""}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Buscar conta..." />
            <CommandEmpty>Sem contas cadastradas.</CommandEmpty>

            {accounts.map((account) => (
              <CommandGroup key={account.id}>
                <CommandItem
                  key={account.id}
                  onSelect={() => {
                    navigate(`/dashboard/${account.id}`)
                    setOpen(false)
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${account.id}.png`}
                      alt={account.name || ""}
                      className="grayscale"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>

                  {account.name}

                  <CheckIcon
                    className={cn("ml-auto h-4 w-4", selectedAccount.id === account.id ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              </CommandGroup>
            ))}
          </CommandList>

          <CommandSeparator />

          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={() => navigate("/accounts/new")}>
                <PlusCircledIcon className="mr-2 h-5 w-5" />
                Criar conta
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
