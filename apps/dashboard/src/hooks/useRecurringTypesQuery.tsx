import { useQuery } from "@tanstack/react-query"
import { getRecurringTypes } from "~/queries/get-recurring-types"

import useSupabase from "./useSupabase"

function useRecurringTypes() {
  const supabase = useSupabase()

  const { data, ...rest } = useQuery({
    queryKey: ["recurring_types"],
    queryFn: async () => {
      return getRecurringTypes(supabase).then((result) => result.data || [])
    },
    initialData: [],
  })

  return { recurringTypes: data, ...rest }
}

export default useRecurringTypes
