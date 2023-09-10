export interface Account {
  account_number: string | null
  agency: string | null
  balance: number | null
  id: string
  name: string
  pix: string | null
  pix_type: string | null
  status: boolean
  user_id: string
}
