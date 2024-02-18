import { useMutation } from "@tanstack/react-query"
import { newTransactionInstance } from "~/queries/new-transaction-instance"
import { TransactionsInstance } from "~/types/transactions-instance"

import useSupabase from "./useSupabase"

export function useNewTransactionInstanceMutation() {
  const supabase = useSupabase()

  const mutationFn = async (transaction: Omit<TransactionsInstance, "id">) => {
    return newTransactionInstance(supabase, transaction).then((result) => result.data)
  }

  return useMutation({ mutationFn })
}
