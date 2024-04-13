import { useMutation } from "@tanstack/react-query"
import { newAddress } from "~/queries/new-address"
import { Address } from "~/types/address"

import useSupabase from "./useSupabase"

export function useNewAddressMutation() {
  const supabase = useSupabase()

  const mutationFn = async (address: Omit<Address, "id">) => {
    return newAddress(supabase, address).then((result) => result.data)
  }

  return useMutation({ mutationFn })
}
