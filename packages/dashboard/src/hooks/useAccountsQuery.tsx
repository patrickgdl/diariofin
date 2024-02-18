import { useQuery } from "@tanstack/react-query"
import { getAccounts } from "~/queries/get-accounts"

import useSupabase from "./useSupabase"
import useAppContext from "./useAppContext"
import * as React from "react"

function useAccounts() {
  const client = useSupabase()

  const { setAccounts } = useAppContext()

  const { data, ...rest } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      return getAccounts(client).then((result) => result.data || [])
    },
    initialData: [],
  })

  React.useEffect(() => {
    if (data.length > 0) {
      setAccounts(data)
    }
  }, [data.length])

  return { accounts: data, ...rest }
}

export default useAccounts
