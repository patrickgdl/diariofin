import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import formatCurrency from "~/utils/format-currency"

type LineMetricsProps = {
  data: { pending: number; done: number }[]
  title: string
}

export default function LineMetrics({ data, title }: LineMetricsProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid vertical={false} stroke="hsl(var(--muted))" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase text-muted-foreground">{title}</span>
                      <span className="font-bold">{formatCurrency(payload[0].value as number)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase text-muted-foreground">{title} Pendentes</span>
                      <span className="font-bold text-muted-foreground">
                        {formatCurrency(payload[1].value as number)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            return null
          }}
        />
        <Line type="monotone" dataKey="done" strokeWidth={2} style={{ stroke: "hsl(var(--primary))" }} />
        <Line
          type="monotone"
          dataKey="pending"
          strokeWidth={2}
          style={{ stroke: "hsl(var(--primary))", opacity: 0.25 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
