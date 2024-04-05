import { SupabaseClient } from "~/services/supabase"
import { CategoryGroups } from "~/types/category-groups"

export async function updateCategoryGroup(
  client: SupabaseClient,
  params: {
    id: string
    data: Partial<CategoryGroups>
  }
) {
  return client
    .from("category_groups")
    .update({ ...params.data })
    .eq("id", params.id)
    .select("*")
    .single()
}
