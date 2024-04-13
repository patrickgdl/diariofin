import { SupabaseClient } from "~/services/supabase"
import { CategoryGroups } from "~/types/category-groups"

export async function newCategoryGroup(client: SupabaseClient, values: Omit<CategoryGroups, "id">) {
  return client
    .from("category_groups")
    .insert({ ...values })
    .throwOnError()
    .select()
    .single()
}
