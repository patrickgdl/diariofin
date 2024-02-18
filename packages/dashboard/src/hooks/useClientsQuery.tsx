import { useQuery } from "@tanstack/react-query"
import { getClients } from "~/queries/get-clients"

import useSupabase from "./useSupabase"

function useClients() {
  const supabase = useSupabase()

  const { data, ...rest } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      return getClients(supabase).then((result) => result.data || [])
    },
    initialData: [],
  })

  return { clients: data, ...rest }
}

export default useClients
