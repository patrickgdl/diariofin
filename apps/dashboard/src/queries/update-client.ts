import { SupabaseClient } from "~/services/supabase"
import { Clients } from "~/types/clients"

export async function updateClient(
  supabase: SupabaseClient,
  params: {
    id: string
    data: Partial<Clients>
  }
) {
  return supabase
    .from("clients")
    .update({ ...params.data })
    .eq("id", params.id)
    .throwOnError()
}
