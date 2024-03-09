import { SupabaseClient } from "~/services/supabase"

export function getTransactionById(supabase: SupabaseClient, id: string | undefined) {
  return supabase.from("transactions").select("*").eq("id", id!).throwOnError().single()
}
