import { useQuery } from "@tanstack/react-query"
import useSupabase from "~/hooks/useSupabase"
import { TRANSACTION_TYPE } from "~/pages/transactions/constants"

import { getTransactionsByDateAndUserId, Props } from "../queries/get-transactions-by-date"

export default function useTransactionsByDateAndUserId({ date, userId }: Props) {
  const supabase = useSupabase()

  const { data, ...rest } = useQuery({
    queryKey: ["transactions", { from: date.from, to: date.to }, { userId }],
    queryFn: async () => {
      return getTransactionsByDateAndUserId(supabase, { date, userId }).then((result) => result.data || null)
    },
    initialData: [],
    enabled: Boolean(date.from) && Boolean(date.to) && Boolean(userId),
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

  return { totalCount, expenseCount, incomeCount, data, ...rest }
}
