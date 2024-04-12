import { endOfYear, startOfYear } from "date-fns"
import { ArrowDownFromLine, ArrowUpFromLine, CalendarClockIcon, DollarSignIcon, HourglassIcon } from "lucide-react"
import * as React from "react"
import { DateRange } from "react-day-picker"
import { useParams } from "react-router-dom"
import AccountSwitcher from "~/components/account-switcher"
import { CalendarDateRangePicker } from "~/components/date-range-picker"
import Overview from "~/components/overview"
import { defaultAccount } from "~/contexts/AppContext"
import useAppContext from "~/hooks/useAppContext"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"

import { TopCategoriesTable } from "../categories/components/top-categories-table"
import { Insights } from "./components/insights"
import MonthByMonthTable from "./components/month-by-month-table"
import MonthlyIncomeProgress from "./components/monthly-income"
import TransactionsReviewTable from "./components/transaction-review-table"
import useTransactionsByDate from "./hooks/use-transactions-by-date"
import Widget from "./components/widget"

export default function DashboardPage() {
  const params = useParams()
  const { accounts, selectedAccount, setSelectedAccount } = useAppContext()

  const [date, setDate] = React.useState<DateRange>({
    from: startOfYear(new Date()),
    to: endOfYear(new Date()),
  })

  const pendingTransactions = useTransactionsByDate({ date, accountId: selectedAccount.id })
  const doneTransactions = useTransactionsByDate({ date, accountId: selectedAccount.id, isDone: true })

  const expenseTransactions = [...doneTransactions.data, ...pendingTransactions.data].filter(
    (transaction) => transaction.amount < 0
  )

  const incomeTransactions = [...doneTransactions.data, ...pendingTransactions.data].filter(
    (transaction) => transaction.amount > 0
  )

  React.useEffect(() => {
    if (params?.accountId && params.accountId !== "all") {
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

          {accounts.length > 0 && <AccountSwitcher accounts={[defaultAccount, ...accounts]} />}

          {/* <ShareReport
            type="Overview"
            defaultValue={{
              from: date.from?.toISOString() || "",
              to: date.to?.toISOString() || "",
            }}
          /> */}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {doneTransactions.data && pendingTransactions.data && (
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <Widget title="Saldo atual" value={doneTransactions.totalCount + pendingTransactions.totalCount}>
                <DollarSignIcon className="mr-2 h-4 w-4" />
              </Widget>

              <Widget title="Recebidos" value={doneTransactions.incomeCount}>
                <ArrowDownFromLine className="mr-2 h-4 w-4" />
              </Widget>

              <Widget title="Pagos" value={Math.abs(doneTransactions.expenseCount)}>
                <ArrowUpFromLine className="mr-2 h-4 w-4" />
              </Widget>

              <Widget title="A receber" value={pendingTransactions.incomeCount}>
                <HourglassIcon className="mr-2 h-4 w-4" />
              </Widget>

              <Widget title="A pagar" value={pendingTransactions.expenseCount}>
                <CalendarClockIcon className="mr-2 h-4 w-4" />
              </Widget>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Overview title="Despesas" description="Suas despesas anuais" data={expenseTransactions} />

              <Overview title="Receitas" description="Suas receitas anuais" data={incomeTransactions} />
            </div>

            <Carousel className="w-full flex flex-col" opts={{ align: "start" }}>
              <div className="flex items-center justify-end mt-4 mb-2">
                <CarouselPrevious className="static p-0 border-none hover:bg-transparent translate-y-0" />
                <CarouselNext className="static p-0 border-none hover:bg-transparent translate-y-0" />
              </div>

              <CarouselContent className="-ml-4">
                <CarouselItem className="lg:basis-1/2 xl:basis-1/3 pl-4">
                  <TransactionsReviewTable data={pendingTransactions.data} />
                </CarouselItem>
                <CarouselItem className="lg:basis-1/2 xl:basis-1/3 pl-4">
                  <TopCategoriesTable data={expenseTransactions} />
                </CarouselItem>
                <CarouselItem className="lg:basis-1/2 xl:basis-1/3 pl-4">
                  <MonthByMonthTable data={[...doneTransactions.data, ...pendingTransactions.data]} />
                </CarouselItem>
                <CarouselItem className="lg:basis-1/2 xl:basis-1/3 pl-4">
                  <MonthlyIncomeProgress
                    incomeTotal={doneTransactions.incomeCount}
                    pendingIncomeTotal={pendingTransactions.incomeCount}
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </TabsContent>
        )}

        <TabsContent value="insights" className="space-y-4">
          <div className="mt-6 flex flex-col sm:grid gap-4 sm:grid-cols-2">
            <Insights />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
