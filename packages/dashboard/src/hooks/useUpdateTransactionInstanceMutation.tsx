import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTransactionInstance } from "~/queries/update-transaction-instance"
import { TransactionsInstance } from "~/types/transactions-instance"

import useSupabase from "./useSupabase"

export function useUpdateTransactionInstanceMutation() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async ({ id, instance }: { id: string; instance: Partial<TransactionsInstance> }) => {
    return updateTransactionInstance(supabase, { data: instance, id }).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
  })
}
