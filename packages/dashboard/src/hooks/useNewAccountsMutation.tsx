import { useMutation, useQueryClient } from "@tanstack/react-query"
import { newAccounts } from "~/queries/new-accounts"
import { Account } from "~/types/account"

import useSupabase from "./useSupabase"

export function useNewAccountsMutation() {
  const client = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async (accounts: Array<Omit<Account, "id">>) => {
    return newAccounts(client, accounts).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
  })
}
