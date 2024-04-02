import { getMonth, parseISO } from "date-fns"
import { useTheme } from "next-themes"
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { themes } from "~/components/themes"
import { TRANSACTION_TYPE } from "~/pages/transactions/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/card"
import formatCurrency from "~/utils/format-currency"

import { TransactionsByDateQuery } from "../queries/get-transactions-by-date"

type GroupForChart = { pendingIncome: number; doneIncome: number; pendingExpense: number; doneExpense: number }

const groupByMonthAndSum = (data: TransactionsByDateQuery) => {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  const grouped: Record<string, GroupForChart> = {}

  // Initialize totals for all months to zero for both "pending" and "done"
  months.forEach((month) => {
    grouped[month] = {
      pendingIncome: 0,
      doneIncome: 0,
      pendingExpense: 0,
      doneExpense: 0,
    }
  })

  data.forEach((item) => {
    const monthIndex = getMonth(parseISO(item.date))
    const month = months[monthIndex]
    // @ts-ignore
    if (item.transactions_instance.is_done) {
      if (item.transaction_types?.id === TRANSACTION_TYPE.INCOME) {
        grouped[month].doneIncome += item.amount
      } else {
        grouped[month].doneExpense += Math.abs(item.amount)
      }
    } else {
      if (item.transaction_types?.id === TRANSACTION_TYPE.INCOME) {
        grouped[month].pendingIncome += item.amount
      } else {
        grouped[month].pendingExpense += Math.abs(item.amount)
      }
    }
  })

  return months.map((month) => ({
    pendingIncome: grouped[month].pendingIncome,
    doneIncome: grouped[month].doneIncome,
    pendingExpense: grouped[month].pendingExpense,
    doneExpense: grouped[month].doneExpense,
  }))
}

export default function CardMetrics({ data }: { data: TransactionsByDateQuery }) {
  const { theme: mode } = useTheme()
  const theme = themes[0]

  const groupedData = groupByMonthAndSum(data)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações ao longo do tempo</CardTitle>
        <CardDescription>Suas transações durante o período selecionado.</CardDescription>
      </CardHeader>
      <CardContent className="py-12">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={groupedData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Entradas Pendentes</span>
                            <span className="font-bold text-muted-foreground">
                              {formatCurrency(payload[0].value as number)}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Entradas Concluídas</span>
                            <span className="font-bold">{formatCurrency(payload[1].value as number)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Gastos Pendentes</span>
                            <span className="font-bold text-muted-foreground">
                              {formatCurrency(payload[2].value as number)}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Gastos Concluídos</span>
                            <span className="font-bold">{formatCurrency(payload[3].value as number)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return null
                }}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="pendingIncome"
                activeDot={{
                  r: 6,
                  style: { fill: "var(--theme-primary)", opacity: 0.25 },
                }}
                style={
                  {
                    stroke: "var(--theme-primary)",
                    opacity: 0.25,
                    "--theme-primary": `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
                  } as React.CSSProperties
                }
              />
              <Line
                type="monotone"
                dataKey="doneIncome"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(--theme-primary)" },
                }}
                style={
                  {
                    stroke: "var(--theme-primary)",
                    "--theme-primary": `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
                  } as React.CSSProperties
                }
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="pendingExpense"
                activeDot={{
                  r: 6,
                  style: { fill: "var(--theme-primary)", opacity: 0.25 },
                }}
                style={
                  {
                    stroke: "var(--theme-primary)",
                    opacity: 0.25,
                    "--theme-primary": `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
                  } as React.CSSProperties
                }
              />
              <Line
                type="monotone"
                dataKey="doneExpense"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(--theme-primary)" },
                }}
                style={
                  {
                    stroke: "var(--theme-primary)",
                    "--theme-primary": `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
                  } as React.CSSProperties
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
