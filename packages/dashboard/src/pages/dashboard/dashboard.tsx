import { subDays } from "date-fns"
import * as React from "react"
import { DateRange } from "react-day-picker"
import { useParams } from "react-router-dom"
import AccountSwitcher from "~/components/account-switcher"
import { CalendarDateRangePicker } from "~/components/date-range-picker"
import { defaultAccount } from "~/contexts/AppContext"
import useAppContext from "~/hooks/useAppContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"
import formatCurrency from "~/utils/format-currency"

import { TopCategoriesTable } from "../categories/components/top-categories-table"
import { MonthByMonthTable } from "./components/month-by-month-table"
import { Overview } from "./components/overview"
import { TransactionsReviewTable } from "./components/transaction-review-table"
import useTransactionsByDate from "./hooks/use-transactions-by-date"
import { CardMetrics } from "./components/card-metrics"

const today = new Date()

export default function DashboardPage() {
  const params = useParams()
  const { accounts, setSelectedAccount } = useAppContext()

  const [date, setDate] = React.useState<DateRange>({
    from: today,
    to: subDays(today, 30),
  })

  const { totalCount, expenseCount, incomeCount } = useTransactionsByDate(date)

  React.useEffect(() => {
    if (params?.accountId) {
      const selected = accounts.find((account) => account.id === params.accountId)
      if (selected) {
        setSelectedAccount(selected)
      }
    } else {
      setSelectedAccount(defaultAccount)
    }
  }, [params])

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker date={date} onSelectDate={setDate} />

          {accounts.length > 0 && <AccountSwitcher accounts={accounts} />}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="consolidated">Consolidado</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo atual</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalCount)}</div>
                {/* <p className="text-xs text-muted-foreground">+20.1% no último mês</p> */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recebidos</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(incomeCount)}</div>
                {/* <p className="text-xs text-muted-foreground">+180.1% no último mês</p> */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Despesas</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(Math.abs(expenseCount))}</div>
                {/* <p className="text-xs text-muted-foreground">+19% no último mês</p> */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vencidos a receber</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 531,30</div>
                {/* <p className="text-xs text-muted-foreground">+201 no último mês</p> */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vencidos a pagar</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 1.231,20</div>
                {/* <p className="text-xs text-muted-foreground">+23 no último mês</p> */}
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fluxo de Caixa</CardTitle>
                <CardDescription>Seu fluxo de caixa durante o período selecionado.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>

            <CardMetrics />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            <TransactionsReviewTable />

            <TopCategoriesTable />
          </div>
        </TabsContent>

        <TabsContent value="consolidated" className="space-y-4">
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            <MonthByMonthTable />

            <TopCategoriesTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
