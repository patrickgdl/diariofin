import { useMemo } from "react"
import { getSupabaseBrowserClient } from "~/services/supabase"

/**
 * We can wrap the above in a useMemo hook to prevent the client from being recreated on every render:
 */
function useSupabase() {
  return useMemo(getSupabaseBrowserClient, [])
}

export default useSupabase
