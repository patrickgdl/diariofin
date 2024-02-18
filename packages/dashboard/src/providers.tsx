import "./translations"

import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import i18next from "i18next"
import React from "react"
import { I18nextProvider } from "react-i18next"

import { AppProvider } from "./contexts/AppContext"
import useSupabase from "./hooks/useSupabase"
import { UserContextProvider } from "./hooks/useUser"
import { TooltipProvider } from "./ui/tooltip"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const Providers = ({ children }: { children: React.ReactNode }) => {
  const supabase = useSupabase()

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <UserContextProvider>
          <AppProvider>
            <TooltipProvider>
              <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
            </TooltipProvider>
          </AppProvider>
        </UserContextProvider>
      </SessionContextProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
