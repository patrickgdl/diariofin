import { useMutation, useQueryClient } from "@tanstack/react-query"
import { newCategoryGroups } from "~/queries/new-groups"
import { CategoryGroups } from "~/types/category-groups"

import useSupabase from "./useSupabase"

export function useNewGroupsMutation() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async (groups: Array<Omit<CategoryGroups, "id">>) => {
    return newCategoryGroups(supabase, groups).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category_groups"] })
    },
  })
}
