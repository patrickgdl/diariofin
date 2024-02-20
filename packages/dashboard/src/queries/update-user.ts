import { SupabaseClient } from "~/services/supabase"
import { User } from "~/types/user"

export async function updateUser(
  supabase: SupabaseClient,
  params: {
    id: string
    data: Partial<User>
  }
) {
  return supabase
    .from("users")
    .update({ ...params.data })
    .eq("id", params.id)
    .throwOnError()
}
