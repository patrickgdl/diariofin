import { QueryData } from "@supabase/supabase-js"
import { SupabaseClient } from "~/services/supabase"

export type TransactionByDateProps = {
  date: DateRange
  accountId?: string
  isDone?: boolean
}

export function getTransactionByDate(
  supabase: SupabaseClient,
  { date, accountId, isDone = false }: TransactionByDateProps
) {
  let query = supabase
    .from("transactions")
    .select(
      `*, 
      transactions_instance!inner(is_cancelled,is_refunded,is_done),
      transaction_types (
        id,
        name
      ),
      transaction_categories (
        id,
        name,
        icon,
        category_groups (
          id, 
          name, 
          color
        )
      )
    `
    )
    .gt("date", date.from?.toISOString())
    .lt("date", date.to?.toISOString())
    .eq("transactions_instance.is_done", isDone)
    .eq("transactions_instance.is_cancelled", false)
    .eq("transactions_instance.is_refunded", false)

  if (accountId && accountId !== "all") {
    query = query.eq("account_id", accountId)
  }

  return query.order("date", { ascending: false }).throwOnError()
}

export type TransactionsByDateQuery = QueryData<ReturnType<typeof getTransactionByDate>>
