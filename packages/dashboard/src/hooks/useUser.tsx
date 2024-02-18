import { User, useSessionContext, useUser as useSupabaseUser } from "@supabase/auth-helpers-react"
import { createContext, useContext, useEffect, useState } from "react"
import { getUserById } from "~/queries/get-user-by-id"

import useSupabase from "./useSupabase"

import type { User as UserType } from "~/types/user"

export type UserContextType = {
  accessToken: string | null
  user: User | null
  userDetails: UserType | null
  isLoading: boolean
  subscription: null // TODO: SubscriptionType
}

export const UserContext = createContext<UserContextType>({
  accessToken: null,
  user: null,
  userDetails: null,
  isLoading: true,
  subscription: null,
})

export const UserContextProvider = (props: any) => {
  const user = useSupabaseUser()
  const supabase = useSupabase()

  const { session, isLoading: isLoadingUser } = useSessionContext()
  const accessToken = session?.access_token ?? null

  const [userDetails, setUserDetails] = useState<UserType | null>(null)
  const [subscription, setSubscription] = useState(null)
  const [isLoadingData, setIsloadingData] = useState(false)

  const getUserDetails = (id: string) => supabase.from("users").select("*").eq("id", id).single()
  // const getSubscription = () =>
  //   supabase.from("subscriptions").select("*, prices(*, products(*))").in("status", ["trialing", "active"]).single()

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true)
      Promise.allSettled([
        getUserDetails(user.id),
        // getSubscription()
      ]).then((results) => {
        const userDetailsPromise = results[0]

        console.log({ userDetailsPromise })
        // const subscriptionPromise = results[1]

        if (userDetailsPromise.status === "fulfilled") setUserDetails(userDetailsPromise.data.value)

        // if (subscriptionPromise.status === "fulfilled") setSubscription(subscriptionPromise.value.data)

        setIsloadingData(false)
      })
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
      setSubscription(null)
    }
  }, [user, isLoadingUser])

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error(`useUser deve ser usado dentro de um UserContextProvider.`)
  }

  return context
}
