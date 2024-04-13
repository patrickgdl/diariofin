import { SupabaseClient } from "~/services/supabase"
import { Reports } from "~/types/reports"

export async function updateReport(
  client: SupabaseClient,
  params: {
    id: string
    data: Partial<Reports>
  }
) {
  return client
    .from("reports")
    .update({ ...params.data })
    .eq("id", params.id)
    .select("*")
    .single()
}
