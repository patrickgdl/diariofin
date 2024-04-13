import { useQuery } from "@tanstack/react-query"
import useSupabase from "~/hooks/useSupabase"
import { TRANSACTION_TYPE } from "~/pages/transactions/constants"
import { TransactionByDateProps, getTransactionByDate } from "~/queries/get-transactions-by-date"

export default function useTransactionsByDate({ date, accountId, isDone = false }: TransactionByDateProps) {
  const supabase = useSupabase()

  const { data, ...rest } = useQuery({
    queryKey: [
      "transactions",
      { from: date.from?.toISOString(), to: date.to?.toISOString() },
      { isDone },
      { accountId },
    ],
    queryFn: async () => {
      return getTransactionByDate(supabase, { date, accountId, isDone }).then((result) => result.data || null)
    },
    initialData: [],
    enabled: Boolean(date.from) && Boolean(date.to),
  })

  const totalCount = data?.reduce((acc, transaction) => acc + transaction.amount, 0) || 0

  const expenseCount =
    data
      ?.filter((d) => d.type_id === TRANSACTION_TYPE.EXPENSE)
      ?.reduce((acc, transaction) => acc + transaction.amount, 0) || 0

  const incomeCount =
    data
      ?.filter((d) => d.type_id === TRANSACTION_TYPE.INCOME)
      ?.reduce((acc, transaction) => acc + transaction.amount, 0) || 0

  return { totalCount, expenseCount, incomeCount, data: data || [], ...rest }
}
