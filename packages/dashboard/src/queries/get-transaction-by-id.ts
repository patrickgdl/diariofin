import { SupabaseClient } from "~/services/supabase"

export function getTransactionById(supabase: SupabaseClient, id: string | undefined) {
  return supabase.from("transaction").select("*").eq("id", id!).throwOnError().single()
}
