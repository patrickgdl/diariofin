import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card"
import formatCurrency from "~/utils/format-currency"

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function SpentSoFarCard() {
  return (
    <div className="">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Gastos até agora</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between">
          {/* Left side details */}
          <div>
            <div className="text-2xl font-bold">{formatCurrency(1248)}</div>
            <p className="text-xs text-muted-foreground">Você tem {formatCurrency(248)} para receber</p>
          </div>
        </CardContent>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
