export interface Transactions {
  id: string
  account_id: string
  amount: number
  category_id: string
  client_id: string | null
  description: string
  type_id: number
  start_date: string
  end_date: string | null
  is_recurring: boolean
  parent_transaction_id: string | null
}
