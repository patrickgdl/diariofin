import { useQuery } from "@tanstack/react-query"
import { getCategories } from "~/queries/get-categories"

import useSupabase from "./useSupabase"
import { useAuthUser } from "~/contexts/SessionContext"

function useCategories() {
  const user = useAuthUser()
  const supabase = useSupabase()

  const { data, ...rest } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return getCategories(supabase, user?.id!).then((result) => result.data || [])
    },
    initialData: [],
  })

  return { categories: data, ...rest }
}

export default useCategories
