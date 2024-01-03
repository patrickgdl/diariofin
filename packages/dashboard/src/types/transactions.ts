export interface Transactions {
  account_id: string
  amount: number
  category_id: string | null
  client_id: string | null
  date: string | null
  description: string | null
  done: boolean | null
  id: string
  type_id: string
}
