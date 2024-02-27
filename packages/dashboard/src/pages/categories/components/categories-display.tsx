import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Avatar, AvatarFallback } from "~/ui/avatar"
import formatCurrency from "~/utils/format-currency"

import { KeyMetricsTable } from "./key-metrics-table"
import { Separator } from "~/ui/separator"

const data2 = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

interface CategoriesDisplayProps {
  mail: any | null
}

export function CategoriesDisplay({ mail }: CategoriesDisplayProps) {
  return (
    <div className="flex h-full flex-col">
      {mail ? (
        <div className="flex flex-1 flex-col">
          {/* Top bar with avatar, text, and badge */}
          <div className="flex items-center justify-between p-4">
            {/* Left section with avatar and text */}
            <div className="flex items-center gap-4">
              <Avatar>
                {/* <AvatarImage
                  src="/path-to-your-avatar-image.png"
                  alt={mail.name}
                /> */}
                <AvatarFallback delayMs={600}>
                  {mail.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold ">{mail.name}</h1>
              </div>
            </div>

            {/* Right section with badge */}
            {mail.date && (
              <div className="flex flex-col items-end">
                <div className="text-m -mb-2 font-semibold">Gastos até agora</div>
                <div className="mt-2 flex items-baseline">
                  <span className="text-m font-semibold">{formatCurrency(mail.income as number)}</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">{formatCurrency(1240.0)} acima</div>
              </div>
            )}
          </div>

          <div className="mx-6 h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data2}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <Separator />
          <KeyMetricsTable />
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">No message selected</div>
      )}
    </div>
  )
}
