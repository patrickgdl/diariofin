import { Json } from "./database.types"

export type User = {
  avatar_url: string | null
  billing_address: Json | null
  full_name: string | null
  id: string
  payment_method: Json | null
  role: string | null
}
