import { SupabaseClient } from "~/services/supabase"
import { TransactionCategories } from "~/types/transaction-categories"

export async function newCategory(supabase: SupabaseClient, values: Omit<TransactionCategories, "id">) {
  return supabase.from("transaction_categories").insert(values).throwOnError().select()
}
