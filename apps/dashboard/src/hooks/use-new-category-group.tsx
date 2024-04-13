import { useMutation, useQueryClient } from "@tanstack/react-query"
import useSupabase from "~/hooks/useSupabase"
import { CategoryGroups } from "~/types/category-groups"
import { newCategoryGroup } from "~/queries/new-category-group"

export function useNewCategoryGroup() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async (group: Omit<CategoryGroups, "id">) => {
    return newCategoryGroup(supabase, group).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-groups"] })
    },
  })
}
