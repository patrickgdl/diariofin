import { QueryData } from "@supabase/supabase-js"
import { SupabaseClient } from "~/services/supabase"

export type Props = {
  date: {
    from: string
    to: string
  }
  userId: string
}

export function getTransactionsByDateAndUserId(supabase: SupabaseClient, { date, userId }: Props) {
  return supabase
    .from("transactions")
    .select(
      `*, 
      transactions_instance!inner(is_cancelled,is_refunded,is_done),
      transaction_types (
        id,
        name
      )
    `
    )
    .gt("date", date.from)
    .lt("date", date.to)
    .eq("user_id", userId)
    .eq("transactions_instance.is_cancelled", false)
    .eq("transactions_instance.is_refunded", false)
    .order("date", { ascending: false })
    .throwOnError()
}

export type TransactionsByDateAndUserId = QueryData<ReturnType<typeof getTransactionsByDateAndUserId>>
