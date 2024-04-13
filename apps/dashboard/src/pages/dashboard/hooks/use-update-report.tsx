import { useMutation } from "@tanstack/react-query"
import useSupabase from "~/hooks/useSupabase"
import { Reports } from "~/types/reports"

import { updateReport } from "../queries/update-report"

export function useUpdateReport() {
  const supabase = useSupabase()

  const mutationFn = async ({ id, report }: { id: string; report: Partial<Reports> }) => {
    return updateReport(supabase, { data: report, id }).then((result) => result.data)
  }

  return useMutation({ mutationFn })
}
