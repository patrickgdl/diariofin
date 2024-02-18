import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "~/queries/get-transactions"

import useSupabase from "./useSupabase"

function useTransactionsQuery(type: number) {
  const client = useSupabase()

  return useQuery({
    queryKey: ["transactions", { type }],
    queryFn: async () => {
      return getTransactions(client, type).then((result) => result.data || [])
    },
    initialData: [],
  })
}

export default useTransactionsQuery
