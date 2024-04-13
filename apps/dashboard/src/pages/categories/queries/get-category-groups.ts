import { QueryData } from "@supabase/supabase-js"
import { SupabaseClient } from "~/services/supabase"

export function getCategoryGroups(supabase: SupabaseClient, userId: string) {
  return supabase.from("category_groups").select("*").eq("user_id", userId).throwOnError()
}

export type CategoryGroupsQuery = QueryData<ReturnType<typeof getCategoryGroups>>
