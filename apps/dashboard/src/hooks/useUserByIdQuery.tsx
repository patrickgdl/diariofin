import { useQuery } from "@tanstack/react-query"
import { getUserById } from "~/queries/get-user-by-id"
import { User } from "~/types/user"

import useSupabase from "./useSupabase"

function useUserById(id: string | undefined) {
  const client = useSupabase()

  return useQuery<User | null>({
    queryKey: ["user", { id }],
    queryFn: async () => {
      return getUserById(client, id).then((result) => result.data || null)
    },
    initialData: null,
    enabled: Boolean(id),
  })
}

export default useUserById
