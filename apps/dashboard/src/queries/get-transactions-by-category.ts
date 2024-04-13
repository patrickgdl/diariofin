import { QueryData } from "@supabase/supabase-js"
import { TRANSACTION_QUERY } from "~/pages/transactions/constants"
import { SupabaseClient } from "~/services/supabase"

export function getTransactionsByCategory(client: SupabaseClient, categoryId: string) {
  return client.from("transactions").select(TRANSACTION_QUERY).eq("category_id", categoryId).throwOnError()
}

export type TransactionsByCategoryQuery = QueryData<ReturnType<typeof getTransactionsByCategory>>
