import { useQuery } from "@tanstack/react-query"
import { getCategoriesAndGroups } from "~/queries/get-categories-and-groups"

import useSupabase from "./useSupabase"

function useCategoriesAndGroups() {
  const supabase = useSupabase()

  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return getCategoriesAndGroups(supabase).then((result) => result.data || [])
    },
    initialData: [],
  })
}

export default useCategoriesAndGroups
