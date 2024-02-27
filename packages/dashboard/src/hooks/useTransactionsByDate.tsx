import { TransactionsQuery } from "~/queries/get-transactions"

import useTransactionsQuery from "./useTransactionsQuery"

type GroupedTransaction = {
  [key: string]: TransactionsQuery
}

function useGroupedTransactions(type: number) {
  const { data } = useTransactionsQuery(type)

  if (!data) return {}

  const displayData = data.reduce((acc: GroupedTransaction, expense) => {
    acc[expense.start_date] = [...(acc[expense.start_date] || []), expense]
    return acc
  }, {})

  return displayData
}

export default useGroupedTransactions
