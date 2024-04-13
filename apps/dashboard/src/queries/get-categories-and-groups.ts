import { SupabaseClient } from "~/services/supabase"

export function getCategoriesAndGroups(supabase: SupabaseClient, userId: string) {
  return supabase
    .from("transaction_categories")
    .select(`id, name, icon, user_id, category_groups(id, name, color)`)
    .eq("user_id", userId)
    .throwOnError()
}
