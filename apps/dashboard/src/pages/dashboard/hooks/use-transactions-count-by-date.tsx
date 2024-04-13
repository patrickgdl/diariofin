import { useQuery } from "@tanstack/react-query"
import useSupabase from "~/hooks/useSupabase"

import { getTransactionCountByDate } from "../queries/get-transactions-count-by-date"

function useTransactionsCountByDate(date: DateRange) {
  const supabase = useSupabase()

  const { data, ...rest } = useQuery({
    queryKey: ["transactions", { from: date.from, to: date.to }],
    queryFn: async () => {
      const { count } = await getTransactionCountByDate(supabase, date)

      return count
    },
    initialData: 0,
    enabled: !!date.from && !!date.to,
  })

  return { count: data, ...rest }
}

export default useTransactionsCountByDate
