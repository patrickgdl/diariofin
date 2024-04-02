import { getMonth, parseISO } from "date-fns"
import * as React from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { TRANSACTION_TYPE } from "~/pages/transactions/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/card"
import formatCurrency from "~/utils/format-currency"

import { TransactionsByDateQuery } from "../queries/get-transactions-by-date"

type GroupForChart = { pendingIncome: number; doneIncome: number; pendingExpense: number; doneExpense: number }

const groupByMonthAndSum = (data: TransactionsByDateQuery) => {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  const grouped: Record<string, GroupForChart> = {}

  // Initialize totals for all months to zero for both "pending" and "done"
  months.forEach((month) => {
    grouped[month] = {
      pendingIncome: 0,
      doneIncome: 0,
      pendingExpense: 0,
      doneExpense: 0,
    }
  })

  data.forEach((item) => {
    const monthIndex = getMonth(parseISO(item.date))
    const month = months[monthIndex]
    // @ts-ignore
    if (item.transactions_instance.is_done) {
      if (item.transaction_types?.id === TRANSACTION_TYPE.INCOME) {
        grouped[month].doneIncome += item.amount
      } else {
        grouped[month].doneExpense += Math.abs(item.amount)
      }
    } else {
      if (item.transaction_types?.id === TRANSACTION_TYPE.INCOME) {
        grouped[month].pendingIncome += item.amount
      } else {
        grouped[month].pendingExpense += Math.abs(item.amount)
      }
    }
  })

  return months.map((month) => ({
    name: month,
    pendingIncome: grouped[month].pendingIncome,
    doneIncome: grouped[month].doneIncome,
    pendingExpense: grouped[month].pendingExpense,
    doneExpense: grouped[month].doneExpense,
  }))
}

const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: any[]; label: string }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-muted p-3">
        {payload.map((ele, index) => (
          <React.Fragment key={index}>
            <small key={index}>
              <span style={{ color: ele.color }}>{ele.name}</span> : {formatCurrency(ele.value)}
            </small>
            <br />
          </React.Fragment>
        ))}
      </div>
    )
  }
  return null
}

export default function Overview({ data }: { data: TransactionsByDateQuery }) {
  const groupedData = groupByMonthAndSum(data)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fluxo de Caixa</CardTitle>
        <CardDescription>Seu fluxo de caixa de transações concluídas e pendentes.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart width={500} height={300} data={groupedData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip active={false} payload={[]} label={""} />} />
            {/* <Legend /> */}
            <Bar dataKey="doneIncome" name="Entradas Concluídas" fill="#10b981" stackId="a" minPointSize={1} />
            <Bar dataKey="pendingIncome" name="Entradas Pendentes" fill="#8884d8" stackId="a" minPointSize={1} />
            <Bar dataKey="doneExpense" name="Gastos Concluídos" fill="#10b981" stackId="b" minPointSize={1} />
            <Bar dataKey="pendingExpense" name="Gastos Pendentes" fill="#8884d8" stackId="b" minPointSize={1} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
