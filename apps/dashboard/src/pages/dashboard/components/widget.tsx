import { Card, CardContent, CardHeader, CardTitle } from "@fluxozen/ui/card"
import formatCurrency from "~/utils/format-currency"

type WidgetProps = {
  title: string
  value: number
  lastMonth?: number
  children: React.ReactNode
}

const Widget = ({ title, value, lastMonth, children }: WidgetProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {children}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tabular-nums">{formatCurrency(value)}</div>
        {/* <p className="text-xs text-muted-foreground">+{lastMonth} no último mês</p> */}
      </CardContent>
    </Card>
  )
}

export default Widget
