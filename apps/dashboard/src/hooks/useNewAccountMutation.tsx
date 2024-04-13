import { useMutation, useQueryClient } from "@tanstack/react-query"
import { newAccount } from "~/queries/new-account"

import useSupabase from "./useSupabase"
import { Account } from "~/types/account"

export function useNewAccountMutation() {
  const client = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async (account: Omit<Account, "id">) => {
    return newAccount(client, account).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
  })
}
