import { SupabaseClient } from "~/services/supabase"
import { Address } from "~/types/address"

export async function updateAddress(
  supabase: SupabaseClient,
  params: {
    id: string
    data: Partial<Address>
  }
) {
  return supabase
    .from("address")
    .update({ ...params.data })
    .eq("id", params.id)
    .throwOnError()
}
