import { useQuery } from "@tanstack/react-query"

import useSupabase from "./useSupabase"
import { getClientsByType } from "~/queries/get-clients-by-type"

function useClientsByType(type: "CLIENT" | "SUPPLIER") {
  const supabase = useSupabase()

  return useQuery({
    queryKey: ["clients", { type }],
    queryFn: async () => {
      return getClientsByType(supabase, type).then((result) => result.data || [])
    },
    initialData: [],
  })
}

export default useClientsByType
