import { useQuery } from "@tanstack/react-query"
import { getAccountById } from "~/queries/get-account-by-id"
import { Account } from "~/types/account"

import useSupabase from "./useSupabase"

function useAccountById(id: string | undefined) {
  const client = useSupabase()

  return useQuery<Account | null>({
    queryKey: ["accounts", { id }],
    queryFn: async () => {
      return getAccountById(client, id).then((result) => result.data || null)
    },
    initialData: null,
    enabled: !!id && id !== "new",
  })
}

export default useAccountById
