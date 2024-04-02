import { endOfYear, startOfYear } from "date-fns"
import { ArrowDownFromLine, ArrowUpFromLine, CalendarClockIcon, DollarSignIcon, HourglassIcon } from "lucide-react"
import * as React from "react"
import { DateRange } from "react-day-picker"
import { useParams } from "react-router-dom"
import AccountSwitcher from "~/components/account-switcher"
import { CalendarDateRangePicker } from "~/components/date-range-picker"
import { defaultAccount } from "~/contexts/AppContext"
import useAppContext from "~/hooks/useAppContext"
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"
import formatCurrency from "~/utils/format-currency"

import { TopCategoriesTable } from "../categories/components/top-categories-table"
import CardMetrics from "./components/card-metrics"
import MonthByMonthTable from "./components/month-by-month-table"
import MonthlyIncomeProgress from "./components/monthly-income"
import Overview from "./components/overview"
import TransactionsReviewTable from "./components/transaction-review-table"
import useTransactionsByDate from "./hooks/use-transactions-by-date"
import { Insights } from "./components/insights"

export default function DashboardPage() {
  const params = useParams()
  const { accounts, selectedAccount, setSelectedAccount } = useAppContext()

  const [date, setDate] = React.useState<DateRange>({
    from: startOfYear(new Date()),
    to: endOfYear(new Date()),
  })

  const pendingTransactions = useTransactionsByDate({ date, accountId: selectedAccount.id })
  const doneTransactions = useTransactionsByDate({ date, accountId: selectedAccount.id, isDone: true })

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
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <CalendarDateRangePicker className="w-full" date={date} onSelectDate={setDate} />

          {accounts.length > 0 && <AccountSwitcher accounts={accounts} />}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo atual</CardTitle>
                <DollarSignIcon className="mr-2 h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">
                  {formatCurrency(doneTransactions.totalCount + pendingTransactions.totalCount)}
                </div>
                {/* <p className="text-xs text-muted-foreground">+20.1% no último mês</p> */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recebidos</CardTitle>
                <ArrowDownFromLine className="mr-2 h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(doneTransactions.incomeCount)}</div>
                {/* <p className="text-xs text-muted-foreground">+180.1% no último mês</p> */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pagos</CardTitle>
                <ArrowUpFromLine className="mr-2 h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">
                  {formatCurrency(Math.abs(doneTransactions.expenseCount))}
                </div>
                {/* <p className="text-xs text-muted-foreground">+19% no último mês</p> */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">A receber</CardTitle>
                <HourglassIcon className="mr-2 h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(pendingTransactions.incomeCount)}</div>
                {/* <p className="text-xs text-muted-foreground">+201 no último mês</p> */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">A pagar</CardTitle>
                <CalendarClockIcon className="mr-2 h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">
                  {formatCurrency(Math.abs(pendingTransactions.expenseCount))}
                </div>
                {/* <p className="text-xs text-muted-foreground">+23 no último mês</p> */}
              </CardContent>
            </Card>
          </div>

          {doneTransactions.data && pendingTransactions.data && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Overview data={[...doneTransactions.data, ...pendingTransactions.data]} />

              <CardMetrics data={[...doneTransactions.data, ...pendingTransactions.data]} />
            </div>
          )}

          {doneTransactions.data && pendingTransactions.data && (
            <Carousel className="w-full flex flex-col" opts={{ align: "start" }}>
              <div className="flex items-center justify-end mt-4 mb-2">
                <CarouselPrevious className="static p-0 border-none hover:bg-transparent translate-y-0" />
                <CarouselNext className="static p-0 border-none hover:bg-transparent translate-y-0" />
              </div>

              <CarouselContent className="-ml-[20px] 2xl:-ml-[40px]">
                <CarouselItem className="lg:basis-1/2 xl:basis-1/3 pl-[20px] 2xl:pl-[40px]">
                  <TransactionsReviewTable data={pendingTransactions.data} />
                </CarouselItem>
                <CarouselItem className="lg:basis-1/2 xl:basis-1/3 pl-[20px] 2xl:pl-[40px]">
                  <TopCategoriesTable data={[...doneTransactions.data, ...pendingTransactions.data]} />
                </CarouselItem>
                <CarouselItem className="lg:basis-1/2 xl:basis-1/3 pl-[20px] 2xl:pl-[40px]">
                  <MonthByMonthTable data={[...doneTransactions.data, ...pendingTransactions.data]} />
                </CarouselItem>
                <CarouselItem className="lg:basis-1/2 xl:basis-1/3 pl-[20px] 2xl:pl-[40px]">
                  <MonthlyIncomeProgress
                    incomeTotal={doneTransactions.incomeCount}
                    pendingIncomeTotal={pendingTransactions.incomeCount}
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          )}
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="mt-6 flex flex-col sm:grid gap-4 sm:grid-cols-2">
            <Insights />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
