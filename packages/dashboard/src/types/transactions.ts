export interface Transactions {
  id: string
  account_id: string
  amount: number
  category_id: string | null
  client_id: string | null
  description: string | null
  type_id: number
  start_date: string | null
  end_date: string | null
  is_recurring: boolean
  parent_transaction_id: string | null
}
