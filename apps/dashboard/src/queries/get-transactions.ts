import { QueryData } from "@supabase/supabase-js"
import { TRANSACTION_QUERY } from "~/pages/transactions/constants"
import { SupabaseClient } from "~/services/supabase"

export function getTransactions(client: SupabaseClient) {
  return client.from("transactions").select(TRANSACTION_QUERY).throwOnError()
}

export type TransactionsQuery = QueryData<ReturnType<typeof getTransactions>>
