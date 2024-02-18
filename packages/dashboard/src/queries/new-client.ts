import { ClientFormType } from "~/components/client-form-schema"
import { SupabaseClient } from "~/services/supabase"

export async function newClient(client: SupabaseClient, values: ClientFormType) {
  return client
    .from("clients")
    .insert({ ...values })
    .throwOnError()
    .select()
}
