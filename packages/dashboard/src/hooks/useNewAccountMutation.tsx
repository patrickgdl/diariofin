import { useMutation } from "@tanstack/react-query"
import { AccountFormType } from "~/components/account-form"
import { newAccount } from "~/queries/new-account"

import useSupabase from "./useSupabase"

export function useNewAccountMutation() {
  const client = useSupabase()

  const mutationFn = async (account: AccountFormType) => {
    return newAccount(client, account).then((result) => result.data)
  }

  return useMutation({ mutationFn })
}
