import { QueryData } from "@supabase/supabase-js"
import { TRANSACTION_QUERY } from "~/pages/transactions/constants"
import { SupabaseClient } from "~/services/supabase"

export function getTransactions(client: SupabaseClient, type: number) {
  return client.from("transactions").select(TRANSACTION_QUERY).eq("type_id", type).throwOnError()
}

export type TransactionsQuery = QueryData<ReturnType<typeof getTransactions>>
