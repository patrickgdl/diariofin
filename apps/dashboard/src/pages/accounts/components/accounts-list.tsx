import { Avatar, AvatarFallback, AvatarImage } from "@diariofin/ui/avatar"
import { Card, CardTitle } from "@diariofin/ui/card"
import { ScrollArea } from "@diariofin/ui/scroll-area"
import { ChevronRight } from "lucide-react"
import { Account } from "~/types/account"
import { getAcronym } from "~/utils/get-acronym"

interface AccountsListProps {
  items: Account[]
  onSelect: (account: Account) => void
}

export function AccountsList({ items, onSelect }: AccountsListProps) {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-4 p-4 pt-0">
        {items.length === 0 ? (
          <div className="text-center text-gray-400">Sem contas encontradas</div>
        ) : (
          <>
            {items.map((item) => (
              <Card
                key={item.id}
                onClick={() => onSelect(item)}
                className="group flex items-center justify-between p-3 hover:cursor-pointer"
              >
                <div className="flex grow flex-col">
                  <CardTitle className="text-md font-bold">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={`https://avatar.vercel.sh/${item.id}.png`} alt={item.name} />
                        <AvatarFallback>{getAcronym(item.name)}</AvatarFallback>
                      </Avatar>

                      <span>{item.name}</span>
                    </div>
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="flex-1 truncate text-sm font-medium">{item.pix}</p>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
    </ScrollArea>
  )
}
