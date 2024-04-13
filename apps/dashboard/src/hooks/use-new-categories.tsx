import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TransactionCategories } from "~/types/transaction-categories"
import { newCategories } from "~/queries/new-categories"

import useSupabase from "./useSupabase"

export function useNewCategories() {
  const client = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async (categories: Array<Omit<TransactionCategories, "id">>) => {
    return newCategories(client, categories).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction_categories"] })
    },
  })
}
