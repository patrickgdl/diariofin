import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarCheck, Check, Edit2Icon, MoreVertical, Trash2Icon } from "lucide-react"
import * as React from "react"
import { TransactionsQuery } from "~/queries/get-transactions-by-account"
import { TransactionCategories } from "~/types/transaction-categories"
import { Button } from "@diariofin/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@diariofin/ui/command"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@diariofin/ui/dropdown-menu"
import { Label } from "@diariofin/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@diariofin/ui/popover"
import { Separator } from "@diariofin/ui/separator"
import { Textarea } from "@diariofin/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@diariofin/ui/tooltip"
import { cn } from "@diariofin/ui/utils"
import formatCurrency from "~/utils/format-currency"

interface TransactionDisplayProps {
  transaction: TransactionsQuery[0]
  categories: TransactionCategories[]
  onDeactivate: (transaction: TransactionsQuery[0]) => void
  onEdit: (transaction: TransactionsQuery[0]) => void
}

export function TransactionDisplay({ transaction, categories, onDeactivate, onEdit }: TransactionDisplayProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!transaction} onClick={() => onEdit(transaction)}>
                <Edit2Icon className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Editar</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!transaction} onClick={() => onDeactivate(transaction)}>
                <Trash2Icon className="h-4 w-4" />
                <span className="sr-only">Inativar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Inativar</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!transaction}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Mais</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transaction.description || "")}>
              Copiar transação
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />

      <div className="flex flex-1 flex-col p-4 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="flex text-sm text-gray-500">
              <CalendarCheck className="h-4 w-4 mr-2" />
              {formatDistanceToNow(new Date(transaction.date), {
                addSuffix: true,
                locale: ptBR,
              })}
            </p>
            <h1 className="text-xl font-semibold">{transaction.description}</h1>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xl font-semibold">{formatCurrency(transaction.amount)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between ">
          <div className="space-y-2">
            <p className="flex text-sm text-gray-500">Conta</p>
            <h3 className="text-xl font-semibold">{transaction.account?.name}</h3>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <h3 className="flex text-sm text-gray-500">Categoria</h3>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" size="sm" aria-expanded={open}>
                  <span>{transaction.transaction_categories?.icon}</span>
                  <span>{transaction.transaction_categories?.name}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Buscar categoria" />
                  <CommandList>
                    <CommandEmpty>Nenhuma categoria.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.id}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                          }}
                        >
                          <Check className={cn("mr-2 h-4 w-4", value === category.id ? "opacity-100" : "opacity-0")} />
                          {category.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Separator />

        <div className="h-[160px]">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="notes">Anotações</Label>
            <Textarea placeholder={""} id="notes" disabled />
          </div>
        </div>
      </div>
    </div>
  )
}
