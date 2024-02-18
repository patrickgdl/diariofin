import { useQuery } from "@tanstack/react-query"
import { getTransactionById } from "~/queries/get-transaction-by-id"

import useSupabase from "./useSupabase"

function useTransactionById(id: string | undefined) {
  const supabase = useSupabase()

  const { data, ...rest } = useQuery({
    queryKey: ["transactions", { id }],
    queryFn: async () => {
      return getTransactionById(supabase, id).then((result) => result.data || null)
    },
    initialData: null,
    enabled: !!id && id !== "new",
  })

  return { transaction: data, ...rest }
}

export default useTransactionById
