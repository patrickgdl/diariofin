import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateClient } from "~/queries/update-client"
import { Clients } from "~/types/clients"

import useSupabase from "./useSupabase"

export function useUpdateClientMutation() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async ({ id, client }: { id: string; client: Partial<Clients> }) => {
    return updateClient(supabase, { data: client, id }).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
    },
  })
}
