import { SupabaseClient } from "~/services/supabase"

export function getCategories(supabase: SupabaseClient) {
  return supabase.from("transaction_categories").select("*").throwOnError()
}
