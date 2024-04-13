import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { TransactionsByTypeQuery } from "~/queries/get-transactions-by-type"
import { Card, CardContent } from "@fluxozen/ui/card"
import formatCurrency from "~/utils/format-currency"

type GroupForChart = { id: string; name: string; value: number; color: string }

type SpentSoFarCardProps = {
  data: TransactionsByTypeQuery
  doneTotal: number
  pendingTotal: number
}

export function SpentSoFarCard({ data, doneTotal, pendingTotal }: SpentSoFarCardProps) {
  const onlySpentTransactions = data.filter((transaction) => transaction.amount < 0)

  const formattedData = onlySpentTransactions.reduce((acc, curr) => {
    const group = curr?.transaction_categories?.category_groups

    if (!acc[group?.id || ""]) {
      acc[group?.id || ""] = {
        id: group?.id || "",
        name: group?.name || "",
        color: group?.color || "",
        value: Math.abs(curr.amount),
      }
    } else {
      acc[group?.id || ""].value += Math.abs(curr.amount)
    }

    return acc
  }, {} as Record<string, GroupForChart>)

  return (
    <Card>
      <CardContent className="h-[280px] md:h-[225px] p-4 relative">
        <div className="absolute top-4 left-4">
          <div className="text-2xl font-bold">{formatCurrency(doneTotal)}</div>
          <p className="text-xs text-muted-foreground">Despesas até agora</p>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={Object.values(formattedData)}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              paddingAngle={5}
            >
              {Object.values(formattedData).map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={entry.color} />
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-col items-end absolute top-4 right-4">
          <div className="text-2xl font-bold">{formatCurrency(pendingTotal)}</div>
          <p className="text-xs text-muted-foreground">Á confirmar</p>
        </div>
      </CardContent>
    </Card>
  )
}
