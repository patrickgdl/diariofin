import { useQuery } from "@tanstack/react-query"
import { getCategoriesAndGroups } from "~/queries/get-categories-and-groups"

import useSupabase from "./useSupabase"
import { useAuthUser } from "~/contexts/SessionContext"

function useCategoriesAndGroups() {
  const { id: user_id } = useAuthUser() || {}
  const supabase = useSupabase()

  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return getCategoriesAndGroups(supabase, user_id!).then((result) => result.data || [])
    },
    initialData: [],
  })
}

export default useCategoriesAndGroups
