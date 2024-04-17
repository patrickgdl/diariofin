import { Link, Navigate, useParams } from "react-router-dom"
import LineMetrics from "~/components/line-metrics"
import Loader from "~/components/loader"
import Overview from "~/components/overview"
import { Button } from "@fluxozen/ui/button"
import formatDate from "~/utils/format-date"

import useReportById from "./hooks/use-report-by-id"
import useTransactionsByDateAndUserId from "./hooks/use-transactions-by-date"

export default function Report() {
  const params = useParams()
  const { data, error, ...reportQuery } = useReportById({ id: params.id! })

  if (error) {
    return <Navigate to="/404" />
  }

  const { data: metricsData, ...transactionsQuery } = useTransactionsByDateAndUserId({
    userId: data?.user_id!,
    date: { from: data?.from!, to: data?.to! },
  })

  if (reportQuery.isLoading || transactionsQuery.isLoading || !data || !metricsData) {
    return <Loader />
  }

  const expenseTransactions = metricsData.filter((transaction) => transaction.amount < 0)
  const incomeTransactions = metricsData.filter((transaction) => transaction.amount > 0)

  return (
    <div className="h-screen flex flex-col pl-4 pr-4">
      <div className="flex items-center md:justify-center w-full py-6 border-b-[1px]">
        <div className="flex items-center flex-col">
          <span className="text-[#878787]">{data?.type}</span>
        </div>

        <Link to="/register" className="absolute right-4">
          <Button variant="outline">Cadastrar-se</Button>
        </Link>
      </div>

      <div className="justify-center items-center w-full flex mt-[60px]">
        <div className="w-[1200px]">
          <div>
            <div className="flex flex-col space-y-2 items-start mb-8">
              <div className="text-[#878787]">
                {formatDate(new Date(data?.from!))} - {formatDate(new Date(data?.to!))}
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Overview data={expenseTransactions} title="Despesas" description="Suas despesas anuais" />
            <Overview data={incomeTransactions} title="Receitas" description="Suas receitas anuais" />
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-center w-full mt-auto h-[80px]">
        <div>
          <p className="text-[#878787] text-sm">
            Feito por{" "}
            <a href={`${import.meta.env.VITE_SITE_URL}?utm_source=report`} className="text-black dark:text-white">
              Fluxozen
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
