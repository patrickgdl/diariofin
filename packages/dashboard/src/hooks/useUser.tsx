import { useEffect, useState, createContext, useContext } from "react"
import { useUser as useSupaUser, useSessionContext, User } from "@supabase/auth-helpers-react"
import supabase from "~/services/supabase"
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
  const user = useSupaUser()
  const { session, isLoading: isLoadingUser } = useSessionContext()
  const accessToken = session?.access_token ?? null

  const [userDetails, setUserDetails] = useState<UserType | null>(null)
  const [subscription, setSubscription] = useState(null)
  const [isLoadingData, setIsloadingData] = useState(false)

  const getUserDetails = () => supabase.from("users").select("*").single()
  // const getSubscription = () =>
  //   supabase.from("subscriptions").select("*, prices(*, products(*))").in("status", ["trialing", "active"]).single()

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true)
      Promise.allSettled([
        getUserDetails(),
        // getSubscription()
      ]).then((results) => {
        const userDetailsPromise = results[0]
        // const subscriptionPromise = results[1]

        if (userDetailsPromise.status === "fulfilled") setUserDetails(userDetailsPromise.value.data)

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
