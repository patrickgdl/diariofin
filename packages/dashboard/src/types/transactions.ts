export interface Transactions {
  id: string
  account_id: string
  amount: number
  category_id: string
  client_id: string | null
  description: string
  type_id: number
  date: string
  is_recurring: boolean
  parent_transaction_id: string | null
  user_id: string
}
