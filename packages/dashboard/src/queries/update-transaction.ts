import { SupabaseClient } from "~/services/supabase"
import { Transactions } from "~/types/transactions"

export async function updateTransaction(
  supabase: SupabaseClient,
  params: {
    id: string
    data: Partial<Transactions>
  }
) {
  return supabase
    .from("transactions")
    .update({ ...params.data })
    .eq("id", params.id)
    .throwOnError()
}
