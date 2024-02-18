import { SupabaseClient } from "~/services/supabase"

export function getUserById(client: SupabaseClient, id: string | undefined) {
  return client.from("users").select("*").eq("id", id!).throwOnError().single()
}
