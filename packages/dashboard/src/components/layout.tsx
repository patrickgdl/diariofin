import * as React from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import useAppContext from "~/hooks/useAppContext"
import supabase from "~/services/supabase"
import { Account } from "~/types/account"

import { AccountFormType } from "./account-form"
import AccountSwitcher from "./account-switcher"
import { MainNav } from "./main-nav"
import ProtectedRoute from "./protected-route"
import { Search } from "./search"
import { UserNav } from "./user-nav"
import { useToast } from "~/ui/use-toast"

const Layout = () => {
  const params = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()

  const containerRef = React.useRef<HTMLDivElement>(null)

  const { isMobile, setIsMobile, selectedAccount, setSelectedAccount, setAccounts, accounts } = useAppContext()

  const getAccountById = async () => {
    if (params?.accountId) {
      const { data, error } = await supabase.from("account").select("*").eq("id", params.accountId).single()

      if (error) return toast({ variant: "destructive", description: "Ocorreu um erro." })

      setSelectedAccount(data)
    }
  }

  const getAccounts = async () => {
    const { data, error } = await supabase.from("account").select("*")

    if (error) return toast({ variant: "destructive", description: "Ocorreu um erro ao requisitar." })

    setAccounts(data)
  }

  const handleNewAccount = async (values: AccountFormType) => {
    const { data, error } = await supabase
      .from("account")
      .insert({ ...values })
      .select()

    if (error) return toast({ variant: "destructive", description: "Ocorreu um erro ao criar." })

    if (data) {
      setAccounts([...accounts, ...data])
      setSelectedAccount(data[0])
      navigate(`/dashboard/${data[0].id}`)
    }
  }

  const handleSelectNewAccount = (account: Account) => {
    setSelectedAccount(account)
    navigate(`/dashboard/${account.id}`)
  }

  React.useEffect(() => {
    getAccountById()
    getAccounts()
  }, [])

  const updateMediaQuery = (value: number) => {
    if (!isMobile && value >= 800) {
      setIsMobile(false)
    } else if (!isMobile && value < 800) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  React.useEffect(() => {
    const containerElement = containerRef.current!
    const containerWidth = containerElement.clientWidth

    updateMediaQuery(containerWidth)

    const resizeObserver = new ResizeObserver((entries) => {
      const { width = containerWidth } = (entries[0] && entries[0].contentRect) || {}
      updateMediaQuery(width)
    })
    resizeObserver.observe(containerElement)

    return () => {
      if (containerElement) {
        resizeObserver.unobserve(containerElement)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col">
      <ProtectedRoute>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {accounts && accounts?.length > 0 && (
              <AccountSwitcher
                accounts={accounts}
                selectedAccount={selectedAccount}
                onNewAccount={handleNewAccount}
                onSelectAccount={handleSelectNewAccount}
              />
            )}

            <MainNav className="mx-6" />

            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>

        <div className="space-y-4 p-8 pt-6 h-[calc(100vh-80px)] overflow-y-auto">
          <Outlet />
        </div>
      </ProtectedRoute>
    </div>
  )
}

export default Layout
