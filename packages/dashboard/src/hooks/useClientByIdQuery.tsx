import { useQuery } from "@tanstack/react-query"
import { Clients } from "~/types/clients"
import { getClientById } from "~/queries/get-client-by-id"

import useSupabase from "./useSupabase"

function useClientById(id: string | undefined) {
  const supabase = useSupabase()

  return useQuery<Clients | null>({
    queryKey: ["clients", { id }],
    queryFn: async () => {
      return getClientById(supabase, id).then((result) => result.data || null)
    },
    initialData: null,
    enabled: !!id && id !== "new",
  })
}

export default useClientById
