import { SupabaseClient } from "~/services/supabase"

export function getCategories(supabase: SupabaseClient, userId: string) {
  return supabase.from("transaction_categories").select("*").eq("user_id", userId).throwOnError()
}
