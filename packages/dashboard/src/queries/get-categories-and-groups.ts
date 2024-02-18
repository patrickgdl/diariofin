import { SupabaseClient } from "~/services/supabase"

export function getCategoriesAndGroups(supabase: SupabaseClient) {
  return supabase.from("transaction_categories").select(`id, name, category_groups (id, name)`).throwOnError()
}
