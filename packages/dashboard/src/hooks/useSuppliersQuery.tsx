import { useQuery } from "@tanstack/react-query"
import { getSuppliers } from "~/queries/get-suppliers"

import useSupabase from "./useSupabase"

function useSuppliers() {
  const supabase = useSupabase()

  const { data, ...rest } = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      return getSuppliers(supabase).then((result) => result.data || [])
    },
    initialData: [],
  })

  return { suppliers: data, ...rest }
}

export default useSuppliers
