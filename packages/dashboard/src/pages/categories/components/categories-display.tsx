import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { TransactionsTableRaw } from "~/components/transactions-table/transactions-table-raw"
import useTransactionsByCategoryQuery from "~/hooks/useTransactionsByCategory"
import { columns } from "~/pages/accounts/components/transactions-columns"
import { Avatar, AvatarFallback } from "~/ui/avatar"
import { Separator } from "~/ui/separator"

import { KeyMetricsTable } from "./key-metrics-table"
import formatCurrency from "~/utils/format-currency"

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

export interface CategoriesDisplayProps {
  category: {
    id: string
    name: string
    icon: string
    category_groups: {
      id: string
      name: string
      color: string
    } | null
  } | null
}

export function CategoriesDisplay({ category }: CategoriesDisplayProps) {
  const { data, groupedData, ...transactionsQuery } = useTransactionsByCategoryQuery(category?.id || "")

  return (
    <div className="flex h-full flex-col">
      {category ? (
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
                  {category.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold ">{category.name}</h1>
              </div>
            </div>

            {/* Right section with badge */}
            {category.name && (
              <div className="flex flex-col items-end">
                <div className="text-m -mb-2 font-medium">Gastos até agora</div>
                <div className="mt-2 flex items-baseline">
                  <span className="text-sm font-semibold">{formatCurrency(1240.0)}</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">{formatCurrency(1240.0)} á confirmar</div>
              </div>
            )}
          </div>

          <Separator />

          {transactionsQuery.isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Carregando transações...</div>
          ) : (
            <div className="p-4">
              <TransactionsTableRaw columns={columns} data={data} groupedData={groupedData} />
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">Sem categoria selecionada</div>
      )}
    </div>
  )
}
