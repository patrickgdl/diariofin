import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "~/queries/update-user"
import { User } from "~/types/user"

import useSupabase from "./useSupabase"

export function useUpdateUserMutation() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async ({ id, user }: { id: string; user: Partial<User> }) => {
    return updateUser(supabase, { data: user, id }).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })
}
