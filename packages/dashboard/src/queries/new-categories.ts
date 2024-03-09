import { SupabaseClient } from "~/services/supabase"
import { TransactionCategories } from "~/types/transaction-categories"

export async function newCategories(supabase: SupabaseClient, values: Array<Omit<TransactionCategories, "id">>) {
  return supabase.from("transaction_categories").insert(values).throwOnError().select()
}
