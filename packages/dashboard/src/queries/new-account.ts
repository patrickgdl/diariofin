import { Account } from "~/types/account"
import { SupabaseClient } from "~/services/supabase"

export async function newAccount(client: SupabaseClient, values: Omit<Account, "id">) {
  return client
    .from("account")
    .insert({ ...values })
    .throwOnError()
    .select()
}
