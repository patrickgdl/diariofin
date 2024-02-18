import { createClient } from "@supabase/supabase-js"
import type { Database } from "~/types/database.types"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const client = createClient<Database>(supabaseUrl, supabaseKey)

// Create a single supabase client for interacting with your database
export function getSupabaseBrowserClient() {
  return client
}

export type SupabaseClient = ReturnType<typeof getSupabaseBrowserClient>
