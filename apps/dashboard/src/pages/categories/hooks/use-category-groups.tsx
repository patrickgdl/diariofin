import { useQuery } from "@tanstack/react-query"
import useSupabase from "~/hooks/useSupabase"

import { getCategoryGroups } from "../queries/get-category-groups"

export default function useCategoryGroups({ userId }: { userId: string }) {
  const supabase = useSupabase()

  return useQuery({
    queryKey: ["category-groups"],
    queryFn: async () => {
      return getCategoryGroups(supabase, userId).then((result) => result.data || [])
    },
    initialData: [],
    enabled: Boolean(userId),
  })
}
