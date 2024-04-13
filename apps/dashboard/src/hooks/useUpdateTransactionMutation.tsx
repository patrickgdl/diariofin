import { useMutation } from "@tanstack/react-query"
import { updateTransaction } from "~/queries/update-transaction"
import { Transactions } from "~/types/transactions"

import useSupabase from "./useSupabase"

export function useUpdateTransactionMutation() {
  const supabase = useSupabase()

  const mutationFn = async ({ id, transaction }: { id: string; transaction: Partial<Transactions> }) => {
    return updateTransaction(supabase, { data: transaction, id }).then((result) => result.data)
  }

  return useMutation({ mutationFn })
}
