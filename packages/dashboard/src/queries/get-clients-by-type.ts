import { SupabaseClient } from "~/services/supabase"

export function getClientsByType(supabase: SupabaseClient, type: string) {
  return supabase
    .from("clients")
    .select("*")
    .eq(type === "CLIENT" ? "is_client" : "is_supplier", true)
    .throwOnError()
}
