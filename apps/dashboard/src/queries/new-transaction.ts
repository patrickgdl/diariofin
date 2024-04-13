import { SupabaseClient } from "~/services/supabase"
import { Transactions } from "~/types/transactions"

export async function newTransaction(supabase: SupabaseClient, values: Omit<Transactions, "id">) {
  return supabase
    .from("transactions")
    .insert({ ...values })
    .throwOnError()
    .select()
}
