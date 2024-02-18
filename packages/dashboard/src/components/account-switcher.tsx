import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import * as React from "react"
import AccountForm, { AccountFormType } from "~/components/account-form"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { cn } from "~/utils/cn"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger> & {
  isCollapsed?: boolean
  accounts: Account[]
  selectedAccount: Account
  onNewAccount: (values: AccountFormType) => void
  onSelectAccount: (account: Account) => void
  classNames?: string | undefined
}

interface AccountSwitcherProps extends PopoverTriggerProps {}

export default function AccountSwitcher({
  isCollapsed = false,
  selectedAccount,
  accounts,
  classNames,
  onNewAccount,
  onSelectAccount,
}: AccountSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewAccountDialog, setShowNewAccountDialog] = React.useState(false)

  const accountsWithDefault = accounts

  function handleSubmit(values: AccountFormType) {
    onNewAccount(values)
    setShowNewAccountDialog(false)
  }

  return (
    <Dialog open={showNewAccountDialog} onOpenChange={setShowNewAccountDialog}>
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
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedAccount.id}.png`}
                alt={selectedAccount.name || ""}
              />
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

              {accountsWithDefault.map((account, index) => (
                <CommandGroup key={account.id}>
                  <CommandItem
                    key={account.id}
                    onSelect={() => {
                      onSelectAccount(account)
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
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewAccountDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Criar conta
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar conta</DialogTitle>
          <DialogDescription>Adicione uma conta para gerenciar.</DialogDescription>
        </DialogHeader>

        <AccountForm onSubmit={handleSubmit} />

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewAccountDialog(false)}>
            Cancelar
          </Button>

          <Button type="submit" form="account-form">
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
