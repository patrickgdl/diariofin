import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAccount } from "~/queries/update-account"
import { Account } from "~/types/account"

import useSupabase from "./useSupabase"

export function useUpdateAccountMutation() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async ({ id, account }: { id: string; account: Partial<Account> }) => {
    return updateAccount(supabase, { data: account, id }).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
  })
}
