import { SupabaseClient } from "~/services/supabase"

export function getAccounts(client: SupabaseClient) {
  return client.from("account").select("*").eq("active", true).throwOnError()
}
