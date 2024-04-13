import { SupabaseClient } from "~/services/supabase"
import { TransactionsInstance } from "~/types/transactions-instance"

export async function newTransactionInstance(supabase: SupabaseClient, values: Omit<TransactionsInstance, "id">) {
  return supabase
    .from("transactions_instance")
    .insert({ ...values })
    .throwOnError()
}
