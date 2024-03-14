import { useQuery } from "@tanstack/react-query"
import { compareDesc, isToday, isYesterday, parseISO } from "date-fns"
import * as React from "react"
import { getTransactionsByAccount, TransactionsQuery } from "~/queries/get-transactions-by-account"
import formatDate from "~/utils/format-date"

import useSupabase from "./useSupabase"

function useTransactionsByAccountQuery(accountId: string) {
  const supabase = useSupabase()

  const { data, ...transactionQuery } = useQuery({
    queryKey: ["transactions", { accountId }],
    queryFn: async () => {
      return getTransactionsByAccount(supabase, accountId).then((result) => result.data || [])
    },
    initialData: [],
  })

  const customFormatDate = (dateString: string) => {
    const date = parseISO(dateString)
    if (isToday(date)) {
      return "Hoje"
    } else if (isYesterday(date)) {
      return "Ontem"
    } else {
      // Example format: 12 de Janeiro de 2022
      return formatDate(date, "dd 'de' MMMM 'de' yyyy")
    }
  }

  const groupedData = React.useMemo(() => {
    // Sort the items by date in descending order so the most recent dates come first
    const sortedItems = data.sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)))

    // Group items by "Hoje", "Ontem", or specific date format
    return sortedItems.reduce((acc, item) => {
      const formattedDate = customFormatDate(item.date) // Use formatDate here
      if (!acc[formattedDate]) {
        acc[formattedDate] = []
      }
      acc[formattedDate]!.push(item)
      return acc
    }, {} as Record<string, TransactionsQuery[0][]>)
  }, [data]) // No need to depend on formatDate if it's not changing

  return {
    data,
    groupedData,
    ...transactionQuery,
  }
}

export default useTransactionsByAccountQuery
