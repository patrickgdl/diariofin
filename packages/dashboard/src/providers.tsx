import "./translations"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import i18next from "i18next"
import React from "react"
import { I18nextProvider } from "react-i18next"

import { AppProvider } from "./contexts/AppContext"
import { SessionContextProvider } from "./contexts/SessionContext"
import { UserContextProvider } from "./contexts/UserContext"
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
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider>
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
