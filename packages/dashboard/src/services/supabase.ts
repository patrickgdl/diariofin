import { createClient } from "@supabase/supabase-js"
import type { Database } from "~/types/database.types"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export default createClient<Database>(supabaseUrl, supabaseKey)

export function getSupabaseBrowserClient() {
  const client = createClient<Database>(supabaseUrl, supabaseKey)

  return client
}

export type SupabaseClient = ReturnType<typeof getSupabaseBrowserClient>
