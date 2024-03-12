import { useQuery } from "@tanstack/react-query"
import { DateRange } from "react-day-picker"
import useSupabase from "~/hooks/useSupabase"

import { getTransactionByDate } from "../queries/get-transactions-by-date"
import { TRANSACTION_TYPE } from "~/pages/transactions/constants"

function useTransactionsByDate(date: DateRange) {
  const supabase = useSupabase()

  const { data, ...rest } = useQuery({
    queryKey: ["transactions", { from: date.from?.toISOString(), to: date.to?.toISOString() }],
    queryFn: async () => {
      return getTransactionByDate(supabase, date).then((result) => result.data || null)
    },
    initialData: [],
    enabled: !!date.from && !!date.to,
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

  return { totalCount, expenseCount, incomeCount, ...rest }
}

export default useTransactionsByDate
