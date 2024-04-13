import { SupabaseClient } from "~/services/supabase"
import { Account } from "~/types/account"

export async function updateAccount(
  supabase: SupabaseClient,
  params: {
    id: string
    data: Partial<Account>
  }
) {
  return supabase
    .from("account")
    .update({ ...params.data })
    .eq("id", params.id)
    .throwOnError()
}
