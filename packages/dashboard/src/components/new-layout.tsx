import * as React from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { AccountFormType } from "~/components/account-form"
import { Account } from "~/types/account"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"
import { Separator } from "~/ui/separator"
import { cn } from "~/utils/cn"
import cookies from "js-cookie"

import AccountSwitcher from "./account-switcher"
import { Nav } from "./nav"
import useAppContext from "~/hooks/useAppContext"
import { UserNav } from "./user-nav"
import { LINKS } from "~/utils/constants"
import useAccountById from "~/hooks/useAccountByIdQuery"
import useAccounts from "~/hooks/useAccountsQuery"
import { useNewAccountMutation } from "~/hooks/useNewAccountMutation"

const layout = JSON.parse(cookies.get("react-resizable-panels:layout") || "")
const collapsed = Boolean(cookies.get("react-resizable-panels:collapsed"))

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed || false)

  const params = useParams()
  const navigate = useNavigate()

  const { setSelectedAccount, setAccounts } = useAppContext()

  const { accounts, isLoading, isError } = useAccounts()
  const { selectedAccount } = useAccountById(params?.accountId)

  const { mutateAsync } = useNewAccountMutation()

  const handleNewAccount = async (values: AccountFormType) => {
    const response = await mutateAsync({ ...values })

    if (response) {
      setAccounts([...accounts, ...response])
      setSelectedAccount(response[0])
      navigate(`/dashboard/${response[0].id}`)
    }
  }

  const handleSelectNewAccount = (account: Account) => {
    setSelectedAccount(account)
    navigate(`/dashboard/${account.id}`)
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
      }}
      className="h-screen items-stretch"
    >
      <ResizablePanel
        defaultSize={layout[0] || 15}
        minSize={15}
        maxSize={15}
        collapsible
        collapsedSize={6}
        onCollapse={() => {
          setIsCollapsed(true)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
        }}
        onExpand={() => {
          setIsCollapsed(false)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
        }}
        className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
      >
        <div className={cn("flex h-[52px] items-center justify-center")}>
          {selectedAccount && (
            <AccountSwitcher
              classNames={"mx-6"}
              isCollapsed={isCollapsed}
              accounts={accounts}
              selectedAccount={selectedAccount}
              onNewAccount={handleNewAccount}
              onSelectAccount={handleSelectNewAccount}
            />
          )}
        </div>
        <Separator />
        <Nav links={LINKS} isCollapsed={isCollapsed} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={layout[1] || 85}>
        <div className="flex items-center px-4 py-2 h-[52px] justify-end">
          <UserNav />
        </div>
        <Separator />

        <div className="h-[calc(100vh-52px)] overflow-auto p-6 space-y-6">
          <main>
            <Outlet />
          </main>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
