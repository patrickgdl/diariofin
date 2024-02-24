import { SupabaseClient } from "~/services/supabase"
import { Clients } from "~/types/clients"

export async function newClient(client: SupabaseClient, values: Omit<Clients, "id">) {
  return client
    .from("clients")
    .insert({ ...values })
    .throwOnError()
    .select()
}
