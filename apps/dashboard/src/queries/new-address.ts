import { SupabaseClient } from "~/services/supabase"
import { Address } from "~/types/address"

export async function newAddress(client: SupabaseClient, values: Omit<Address, "id">) {
  return client
    .from("address")
    .insert({ ...values })
    .throwOnError()
    .select()
}
