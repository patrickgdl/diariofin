import { useQuery } from "@tanstack/react-query"
import { getCategories } from "~/queries/get-categories"

import useSupabase from "./useSupabase"

function useCategories() {
  const supabase = useSupabase()

  const { data, ...rest } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return getCategories(supabase).then((result) => result.data || [])
    },
    initialData: [],
  })

  return { categories: data, ...rest }
}

export default useCategories
