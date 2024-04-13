import { useMutation } from "@tanstack/react-query"
import useSupabase from "~/hooks/useSupabase"
import { Reports } from "~/types/reports"

import { newReport } from "../queries/new-report"

export function useNewReport() {
  const supabase = useSupabase()

  const mutationFn = async (report: Omit<Reports, "id">) => {
    return newReport(supabase, report).then((result) => result.data)
  }

  return useMutation({ mutationFn })
}
