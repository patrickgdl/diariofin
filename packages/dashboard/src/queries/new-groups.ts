import { SupabaseClient } from "~/services/supabase"
import { CategoryGroups } from "~/types/category-groups"

export async function newCategoryGroups(supabase: SupabaseClient, values: Array<Omit<CategoryGroups, "id">>) {
  return supabase.from("category_groups").insert(values).throwOnError().select()
}
