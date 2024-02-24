import { SupabaseClient } from "~/services/supabase"

export function getClientById(supabase: SupabaseClient, id: string | undefined) {
  return supabase.from("clients").select("*").eq("id", id!).throwOnError().single()
}
