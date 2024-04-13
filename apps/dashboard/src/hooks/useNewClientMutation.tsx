import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Clients } from "~/types/clients"
import { newClient } from "~/queries/new-client"

import useSupabase from "./useSupabase"

export function useNewClientMutation() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async (client: Omit<Clients, "id">) => {
    return newClient(supabase, client).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
    },
  })
}
