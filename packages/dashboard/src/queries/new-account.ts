import { AccountFormType } from "~/components/account-form"
import { SupabaseClient } from "~/services/supabase"

export async function newAccount(client: SupabaseClient, values: AccountFormType) {
  return client
    .from("account")
    .insert({ ...values })
    .throwOnError()
    .select()
}
