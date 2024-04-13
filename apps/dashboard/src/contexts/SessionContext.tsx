import { AuthError, Session } from "@supabase/supabase-js"
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react"
import useSupabase from "~/hooks/useSupabase"

export type SessionContext =
  | {
      isLoading: true
      session: null
      error: null
    }
  | {
      isLoading: false
      session: Session
      error: null
    }
  | {
      isLoading: false
      session: null
      error: AuthError
    }
  | {
      isLoading: false
      session: null
      error: null
    }

const SessionContext = createContext<SessionContext>({
  isLoading: true,
  session: null,
  error: null,
})

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const [error, setError] = useState<AuthError>()
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const supabaseClient = useSupabase()

  useEffect(() => {
    let mounted = true

    async function getSession() {
      const { data, error } = await supabaseClient.auth.getSession()
      const { session } = data

      // only update the react state if the component is still mounted
      if (mounted) {
        if (error) {
          setError(error)
          setIsLoading(false)
          return
        }

        setSession(session)
        setIsLoading(false)
      }
    }

    getSession()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED")) {
        setSession(session)
      }

      if (event === "SIGNED_OUT") {
        setSession(null)
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const value: SessionContext = useMemo(() => {
    if (isLoading) {
      return {
        isLoading: true,
        session: null,
        error: null,
      }
    }

    if (error) {
      return {
        isLoading: false,
        session: null,
        error,
      }
    }

    return {
      isLoading: false,
      session,
      error: null,
    }
  }, [isLoading, session, error])

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error(`useSessionContext must be used within a SessionContextProvider.`)
  }

  return context
}

export const useSession = () => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error(`useSession must be used within a SessionContextProvider.`)
  }

  return context.session
}

export const useAuthUser = () => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error(`useAuthUser must be used within a SessionContextProvider.`)
  }

  return context.session?.user ?? null
}
