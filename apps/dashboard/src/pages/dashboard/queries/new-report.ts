import { SupabaseClient } from "~/services/supabase"
import { Reports } from "~/types/reports"

export async function newReport(client: SupabaseClient, values: Omit<Reports, "id">) {
  return client
    .from("reports")
    .insert({ ...values })
    .throwOnError()
    .select()
    .single()
}
