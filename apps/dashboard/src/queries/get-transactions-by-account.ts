import { QueryData } from "@supabase/supabase-js"
import { TRANSACTION_QUERY } from "~/pages/transactions/constants"
import { SupabaseClient } from "~/services/supabase"

export function getTransactionsByAccount(client: SupabaseClient, accountId: string) {
  return client.from("transactions").select(TRANSACTION_QUERY).eq("account_id", accountId).throwOnError()
}

export type TransactionsQuery = QueryData<ReturnType<typeof getTransactionsByAccount>>
