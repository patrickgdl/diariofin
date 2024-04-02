import React, { createContext } from "react"
import { Account } from "~/types/account"

export const defaultAccount: Account = {
  id: "all",
  name: "Contas",
  active: true,
  user_id: "",
  account_number: null,
  agency: null,
  balance: 0,
  pix: null,
  pix_type: null,
}

interface IAppContext {
  accounts: Account[]
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>
  selectedAccount: Account
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>
}

export const AppContext = createContext<IAppContext>({
  accounts: [],
  setAccounts: () => {},
  selectedAccount: defaultAccount,
  setSelectedAccount: () => {},
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, setAccounts] = React.useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = React.useState<Account>(defaultAccount)

  const context = {
    accounts,
    setAccounts,
    selectedAccount,
    setSelectedAccount,
  }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
