import { useQuery } from "@tanstack/react-query"
import useSupabase from "~/hooks/useSupabase"

import { getReportById } from "../queries/get-report-by-id"

export default function useReportById({ id }: { id: string }) {
  const supabase = useSupabase()

  return useQuery({
    queryKey: ["reports", { id }],
    queryFn: async () => {
      return getReportById(supabase, id).then((result) => result.data || null)
    },
    initialData: null,
    enabled: Boolean(id),
  })
}
