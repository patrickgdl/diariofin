export interface TransactionsInstance {
  transaction_id: string
  is_done: boolean
  is_cancelled: boolean | null
  is_refunded: boolean | null
  user_id: string
}
