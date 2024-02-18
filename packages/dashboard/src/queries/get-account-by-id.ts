import { SupabaseClient } from "~/services/supabase"

export function getAccountById(client: SupabaseClient, id: string | undefined) {
  return client.from("account").select("*").eq("id", id!).throwOnError().single()
}
