import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AccountFormType } from "~/pages/account-form/schema/account-form-schema"
import { newAccount } from "~/queries/new-account"

import useSupabase from "./useSupabase"

export function useNewAccountMutation() {
  const client = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async (account: AccountFormType) => {
    return newAccount(client, account).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
  })
}
