import { QueryData } from "@supabase/supabase-js"
import { SupabaseClient } from "~/services/supabase"

export function getReportById(supabase: SupabaseClient, id: string) {
  return supabase.from("reports").select("*").eq("id", id).single().throwOnError()
}

export type ReportByIdQuery = QueryData<ReturnType<typeof getReportById>>
