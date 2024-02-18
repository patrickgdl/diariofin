import { useMutation } from "@tanstack/react-query"
import { ClientFormType } from "~/components/client-form-schema"
import { newClient } from "~/queries/new-client"

import useSupabase from "./useSupabase"

export function useNewClientMutation() {
  const supabase = useSupabase()

  const mutationFn = async (client: ClientFormType) => {
    return newClient(supabase, client).then((result) => result.data)
  }

  return useMutation({ mutationFn })
}
