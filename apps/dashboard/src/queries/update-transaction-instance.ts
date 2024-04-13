import { SupabaseClient } from "~/services/supabase"
import { TransactionsInstance } from "~/types/transactions-instance"

export async function updateTransactionInstance(
  supabase: SupabaseClient,
  params: {
    id: string
    data: Partial<TransactionsInstance>
  }
) {
  return supabase
    .from("transactions_instance")
    .update({ ...params.data })
    .eq("transaction_id", params.id)
    .throwOnError()
}
