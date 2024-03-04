import { ChevronRight } from "lucide-react"
import { Account } from "~/types/account"
import { Badge } from "~/ui/badge"
import { Card, CardTitle } from "~/ui/card"
import { ScrollArea } from "~/ui/scroll-area"
import formatCurrency from "~/utils/format-currency"

interface AccountsListProps {
  items: Account[]
  onSelect: (account: Account) => void
}

export function AccountsList({ items, onSelect }: AccountsListProps) {
  // Group items by category
  // const groupedItems = items.reduce((acc, item) => {
  //   if (!acc[item.name]) {
  //     acc[item.name] = []
  //   }
  //   // @ts-ignore
  //   acc[item.category].push(item)
  //   return acc
  // }, {} as Record<string, any[]>)

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-4 p-4 pt-0">
        {items.map((item) => (
          <Card
            key={item.id}
            onClick={() => onSelect(item)}
            className="group flex items-center justify-between p-3 hover:cursor-pointer"
          >
            <div className="flex grow flex-col">
              <CardTitle className="text-md font-bold">{item.name}</CardTitle>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={item.balance >= 0 ? "default" : "destructive"} className="self-start">
                {item.balance >= 0 ? `▲ ${1}%` : `▼ ${Math.abs(12)}%`}
              </Badge>
              <p className="flex-1 truncate text-sm font-medium">{formatCurrency(item.balance)}</p>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
