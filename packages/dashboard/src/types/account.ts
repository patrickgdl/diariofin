export interface Account {
  account_number: string | null
  agency: string | null
  balance: number
  id: string
  name: string
  pix: string | null
  pix_type: string | null
  active: boolean
  user_id: string | null
}
