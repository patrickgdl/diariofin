import { PropsWithChildren, createContext, useContext } from "react"
import { useAuthUser, useSessionContext } from "~/contexts/SessionContext"
import { User as AuthUser } from "@supabase/supabase-js"
import type { User } from "~/types/user"
import useUserById from "~/hooks/useUserByIdQuery"

export type UserContextType = {
  accessToken: string | null
  authUser: AuthUser | null
  user: User | null
  isLoading: boolean
}

export const UserContext = createContext<UserContextType>({
  accessToken: null,
  authUser: null,
  user: null,
  isLoading: true,
})

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const authUser = useAuthUser()

  const { session, isLoading: isLoadingAuthUser } = useSessionContext()
  const accessToken = session?.access_token ?? null

  const { data: user, isLoading: isLoadingData } = useUserById(authUser?.id)

  const value = {
    accessToken,
    authUser,
    user,
    isLoading: isLoadingAuthUser || isLoadingData,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error(`useUser deve ser usado dentro de um UserContextProvider.`)
  }

  return context
}
