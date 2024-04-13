import { getMonth, parseISO } from "date-fns"
import { BarChart3Icon, LineChartIcon } from "lucide-react"
import { TransactionsByDateAndUserId } from "~/pages/report/queries/get-transactions-by-date"
import { TransactionsByDateQuery } from "~/queries/get-transactions-by-date"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@fluxozen/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@fluxozen/ui/tabs"

import BarMetrics from "./bar-metrics"
import LineMetrics from "./line-metrics"

const groupByMonthAndSum = (data: TransactionsByDateQuery | TransactionsByDateAndUserId) => {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  const grouped: Record<string, { pending: number; done: number }> = {}

  // Initialize totals for all months to zero for both "pending" and "done"
  months.forEach((month) => {
    grouped[month] = {
      pending: 0,
      done: 0,
    }
  })

  data.forEach((item) => {
    const monthIndex = getMonth(parseISO(item.date))
    const month = months[monthIndex]
    if (item.transactions_instance?.is_done) {
      grouped[month].done += item.amount
    } else {
      grouped[month].pending += item.amount
    }
  })

  return months.map((month) => ({
    name: month,
    pending: grouped[month].pending,
    done: grouped[month].done,
  }))
}

type OverviewProps = {
  data: TransactionsByDateQuery | TransactionsByDateAndUserId
  title: string
  description: string
}

export default function Overview({ data, title, description }: OverviewProps) {
  const groupedData = groupByMonthAndSum(data)

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <Tabs defaultValue="bar" className="space-y-4">
          <TabsList className="absolute top-4 right-4">
            <TabsTrigger value="bar">
              <BarChart3Icon className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="line">
              <LineChartIcon className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="space-y-4">
            <BarMetrics data={groupedData} title={title} />
          </TabsContent>

          <TabsContent value="line" className="space-y-4">
            <LineMetrics data={groupedData} title={title} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
