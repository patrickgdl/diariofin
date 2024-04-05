import { useMutation, useQueryClient } from "@tanstack/react-query"
import useSupabase from "~/hooks/useSupabase"
import { CategoryGroups } from "~/types/category-groups"

import { updateCategoryGroup } from "../queries/update-category-group"

export function useUpdateCategoryGroup() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async ({ id, group }: { id: string; group: Partial<CategoryGroups> }) => {
    return updateCategoryGroup(supabase, { data: group, id }).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-groups"] })
    },
  })
}
