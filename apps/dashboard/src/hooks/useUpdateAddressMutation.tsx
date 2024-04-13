import { useMutation } from "@tanstack/react-query"
import { updateAddress } from "~/queries/update-address"
import { Address } from "~/types/address"

import useSupabase from "./useSupabase"

export function useUpdateAddressMutation() {
  const supabase = useSupabase()

  const mutationFn = async ({ id, address }: { id: string; address: Partial<Address> }) => {
    return updateAddress(supabase, { data: address, id }).then((result) => result.data)
  }

  return useMutation({ mutationFn })
}
