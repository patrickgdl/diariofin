import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@diariofin/ui/card"
import { Progress } from "@diariofin/ui/progress"
import formatCurrency from "~/utils/format-currency"

const MonthlyIncomeProgress = ({
  incomeTotal,
  pendingIncomeTotal,
}: {
  incomeTotal: number
  pendingIncomeTotal: number
}) => {
  const progressPercent = (incomeTotal / pendingIncomeTotal) * 100

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Renda Mensal</CardTitle>
        <CardDescription>Suas entradas recebidas versus a receber</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center space-x-2">
          <span>{formatCurrency(incomeTotal)}</span>
          <Progress value={progressPercent} className="w-full" />
          <span>{formatCurrency(pendingIncomeTotal)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default MonthlyIncomeProgress
