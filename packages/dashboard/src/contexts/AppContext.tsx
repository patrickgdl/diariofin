import React, { createContext, useState } from "react"
import { Account } from "~/types/account"

const defaultAccount: Account = {
  id: "all",
  name: "Todas as contas",
  status: true,
  user_id: "",
  account_number: null,
  agency: null,
  balance: null,
  pix: null,
  pix_type: null,
}

interface IAppContext {
  isMobile: boolean | undefined
  setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>
  accounts: Account[]
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>
  selectedAccount: Account
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => {},
  accounts: [],
  setAccounts: () => {},
  selectedAccount: defaultAccount,
  setSelectedAccount: () => {},
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)
  const [accounts, setAccounts] = React.useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = React.useState<Account>(defaultAccount)

  const context = {
    isMobile,
    setIsMobile,
    accounts,
    setAccounts,
    selectedAccount,
    setSelectedAccount,
  }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
