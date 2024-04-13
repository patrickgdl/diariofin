import * as React from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import formatCurrency from "~/utils/format-currency"

const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: any[]; label: string }) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg border bg-background p-3">
        {payload.map((ele, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ele.color }} />
              <div className="flex items-center space-x-1">
                <span className="text-xs uppercase text-muted-foreground">{ele.name}</span>
                <span className="text-xs font-bold">{formatCurrency(ele.value)}</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    )
  }
  return null
}

type LineMetricsProps = {
  data: { pending: number; done: number }[]
  title: string
}

export default function BarMetrics({ data, title }: LineMetricsProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} stroke="hsl(var(--muted))" />

        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip active={false} payload={[]} label={""} />} />
        <Bar dataKey="done" name={title} stackId="a" fill="hsl(var(--secondary-foreground))" />
        <Bar dataKey="pending" name={`${title} Pendentes`} stackId="b" fill="hsl(var(--muted-foreground))" />
      </BarChart>
    </ResponsiveContainer>
  )
}
