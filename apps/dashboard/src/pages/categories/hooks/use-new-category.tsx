import { useMutation, useQueryClient } from "@tanstack/react-query"
import useSupabase from "~/hooks/useSupabase"
import { TransactionCategories } from "~/types/transaction-categories"

import { newCategory } from "../queries/new-category"

export function useNewCategory() {
  const client = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async (categories: Omit<TransactionCategories, "id">) => {
    return newCategory(client, categories).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })
}
