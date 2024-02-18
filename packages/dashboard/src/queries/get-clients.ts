import { SupabaseClient } from "~/services/supabase"

export function getClients(supabase: SupabaseClient) {
  return supabase.from("clients").select("*").eq("is_client", true).throwOnError()
}
