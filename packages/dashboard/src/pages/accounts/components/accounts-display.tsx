import { Edit2Icon, MoreVertical, Trash2Icon } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { TransactionsTableRaw } from "~/components/transactions-table/transactions-table-raw"
import useTransactionsByAccountQuery from "~/hooks/useTransactionsByAccountQuery"
import { Account } from "~/types/account"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Badge } from "~/ui/badge"
import { Button } from "~/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/ui/dropdown-menu"
import { Separator } from "~/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"
import formatCurrency from "~/utils/format-currency"

import { columns } from "./transactions-columns"

interface AccountsDisplayProps {
  account: Account
  onDeactivate: (account: Account) => void
  onEdit: (account: Account) => void
}

type MonthlyIncomeData = {
  income: number
  change: number
  limit: number
}

const generateMonthlyIncomeData = (baseIncome: number): MonthlyIncomeData[] => {
  let monthlyData: MonthlyIncomeData[] = []
  for (let i = 0; i < 12; i++) {
    const change = Math.floor(Math.random() * 20) - 10
    const income = baseIncome + (baseIncome * change) / 100
    monthlyData.push({ income, change, limit: 25000 })
  }
  return monthlyData
}

const monthlyIncomeDataFake = generateMonthlyIncomeData(1052)

export function AccountsDisplay({ account, onDeactivate, onEdit }: AccountsDisplayProps) {
  const { data, groupedData, ...incomeQuery } = useTransactionsByAccountQuery(account.id)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!account} onClick={() => onEdit(account)}>
                <Edit2Icon className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!account} onClick={() => onDeactivate(account)}>
                <Trash2Icon className="h-4 w-4" />
                <span className="sr-only">Excluir</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!account}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Mais</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(account.name || "")}>
              Copiar nome
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />

      <div className="flex flex-1 flex-col">
        {/* Top bar with avatar, text, and badge */}
        <div className="flex items-center justify-between p-4">
          {/* Left section with avatar and text */}
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/path-to-your-avatar-image.png" alt={account.name} />
              <AvatarFallback delayMs={600}>
                {account.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              {/* <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(account.created_at), {
                    addSuffix: true,
                  })}
                </p> */}
              <h1 className="text-xl font-semibold">{account.name}</h1>
            </div>
          </div>

          {/* Right section with badge */}
          <div className="flex flex-col items-end">
            <Badge variant={account.balance >= 0 ? "default" : "destructive"} className="self-end">
              {account.balance >= 0 ? `▲ ${1}%` : `▼ ${Math.abs(1).toFixed(2)}%`}
            </Badge>
            <div className="mt-2 flex items-baseline">
              <span className="text-m font-semibold">{formatCurrency(account.balance)}</span>
              <span className="text-m text-muted-foreground">/ {formatCurrency(account.balance)}</span>
            </div>
          </div>
        </div>

        <div className="mx-6 h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyIncomeDataFake} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <Line type="monotone" dataKey="income" stroke="#8884d8" strokeWidth={2} />
              <RechartsTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const incomeData = payload.find((p) => p.dataKey === "income")

                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex flex-col">
                          {incomeData && (
                            <div>
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Entradas</span>
                              <span className="font-bold">{formatCurrency(incomeData.value as number)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Separator className="" />

        {incomeQuery.isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Carregando transações...</div>
        ) : (
          <div className="p-4">
            <TransactionsTableRaw columns={columns} data={data} groupedData={groupedData} />
          </div>
        )}
      </div>
    </div>
  )
}
