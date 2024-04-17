import { Avatar, AvatarFallback } from "@fluxozen/ui/avatar"
import { Separator } from "@fluxozen/ui/separator"
import ErrorState from "~/components/error-state"
import Loader from "~/components/loader"
import { TransactionsTableRaw } from "~/components/transactions-table/transactions-table-raw"
import useTransactionsByCategoryQuery from "~/hooks/useTransactionsByCategory"
import { columns } from "~/pages/accounts/components/transactions-columns"
import formatCurrency from "~/utils/format-currency"

import { TransactionGroupedByCategory } from "./categories-table"

export interface CategoryDisplayProps {
  category: TransactionGroupedByCategory["categories"][0] | null
}

export function CategoryDisplay({ category }: CategoryDisplayProps) {
  const { data, groupedData, ...transactionsQuery } = useTransactionsByCategoryQuery(
    category?.transaction_categories?.id || ""
  )

  if (transactionsQuery.isLoading || transactionsQuery.isFetching) {
    return <Loader />
  }

  if (transactionsQuery.isError) {
    return <ErrorState />
  }

  return (
    <div className="flex h-full flex-col">
      {category ? (
        <div className="flex flex-1 flex-col">
          {/* Top bar with avatar, text, and badge */}
          <div className="flex items-center justify-between p-4">
            {/* Left section with avatar and text */}
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{category.transaction_categories.icon}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold ">{category.transaction_categories.name}</h2>
              </div>
            </div>

            {/* Right section with text */}
            {category.transaction_categories.name && (
              <div className="flex flex-col items-end">
                <div className="text-m -mb-2 font-medium">Despesas</div>
                <div className="mt-2 flex items-baseline">
                  <span className="text-sm font-semibold">{formatCurrency(category.amount)}</span>
                </div>
                <div className="mt-1 text-sm hidden md:flex text-gray-500">{formatCurrency(0)} á confirmar</div>
              </div>
            )}
          </div>

          <Separator />

          {transactionsQuery.isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Carregando transações...</div>
          ) : (
            <div className="p-4">
              <TransactionsTableRaw columns={columns} data={data} groupedData={groupedData} />
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">Sem categoria selecionada</div>
      )}
    </div>
  )
}
