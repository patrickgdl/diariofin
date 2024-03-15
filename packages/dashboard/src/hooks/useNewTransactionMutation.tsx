import { useMutation, useQueryClient } from "@tanstack/react-query"
import { newTransaction } from "~/queries/new-transaction"
import { Transactions } from "~/types/transactions"

import useSupabase from "./useSupabase"

export function useNewTransactionMutation() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async (transaction: Omit<Transactions, "id">) => {
    return newTransaction(supabase, transaction).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
  })
}
