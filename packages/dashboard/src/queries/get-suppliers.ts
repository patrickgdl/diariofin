import { SupabaseClient } from "~/services/supabase"

export function getSuppliers(supabase: SupabaseClient) {
  return supabase.from("clients").select("*").eq("is_supplier", true).throwOnError()
}
