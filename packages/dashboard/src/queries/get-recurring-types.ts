import { SupabaseClient } from "~/services/supabase"

export function getRecurringTypes(supabase: SupabaseClient) {
  return supabase.from("recurring_types").select("*").throwOnError()
}
