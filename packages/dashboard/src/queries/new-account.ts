import { AccountFormType } from "~/pages/account-form/schema/account-form-schema"
import { SupabaseClient } from "~/services/supabase"

export async function newAccount(client: SupabaseClient, values: AccountFormType) {
  return client
    .from("account")
    .insert({ ...values })
    .throwOnError()
    .select()
}
