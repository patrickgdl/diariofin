import { useQuery } from "@tanstack/react-query"
import { getAccountById } from "~/queries/get-account-by-id"

import useSupabase from "./useSupabase"
import useAppContext from "./useAppContext"
import { Account } from "~/types/account"
import * as React from "react"

function useAccountById(id: string | undefined) {
  const client = useSupabase()

  const { setSelectedAccount } = useAppContext()

  const { data, ...rest } = useQuery<Account | null>({
    queryKey: ["accounts", { id }],
    queryFn: async () => {
      return getAccountById(client, id).then((result) => result.data || null)
    },
    initialData: null,
    enabled: !!id,
  })

  React.useEffect(() => {
    if (data) {
      setSelectedAccount(data)
    }
  }, [data])

  return { selectedAccount: data, ...rest }
}

export default useAccountById
