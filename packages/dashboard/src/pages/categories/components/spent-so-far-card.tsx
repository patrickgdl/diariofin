import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { TransactionsQuery } from "~/queries/get-transactions-by-account"
import { TransactionsByTypeQuery } from "~/queries/get-transactions-by-type"
import { Card, CardContent } from "~/ui/card"
import formatCurrency from "~/utils/format-currency"

type GroupForChart = { id: string; name: string; value: number; color: string }

export function SpentSoFarCard({ data }: { data: TransactionsByTypeQuery }) {
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
    <div className="">
      <Card>
        <CardContent className="flex justify-between h-[225px] p-6 space-x-4">
          <div>
            <div className="text-2xl font-bold">{formatCurrency(1248)}</div>
            <p className="text-xs text-muted-foreground">Gastos até agora</p>
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
                  console.log(entry)
                  return <Cell key={`cell-${index}`} fill={entry.color} />
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold">{formatCurrency(1248)}</div>
            <p className="text-xs text-muted-foreground">Á confirmar</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
