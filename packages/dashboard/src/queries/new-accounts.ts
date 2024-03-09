import { Account } from "~/types/account"
import { SupabaseClient } from "~/services/supabase"

export async function newAccounts(client: SupabaseClient, values: Array<Omit<Account, "id">>) {
  return client.from("account").insert(values).throwOnError().select()
}
