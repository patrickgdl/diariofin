import { Json } from "./database.types"

export interface SupabaseTemplate {
  created_at: string | null
  uuid: number
  template: Json
}
