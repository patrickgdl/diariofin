import cookies from "js-cookie"
import * as React from "react"
import { Navigate } from "react-router-dom"
import useAccounts from "~/hooks/useAccountsQuery"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"
import { Separator } from "~/ui/separator"
import { cn } from "~/utils/cn"
import { LINKS } from "~/utils/constants"

import AccountSwitcher from "./account-switcher"
import ErrorState from "./error-state"
import Loader from "./loader"
import { Nav } from "./nav"
import { UserNav } from "./user-nav"
import Account from "~/pages/account"

const layout = JSON.parse(cookies.get("react-resizable-panels:layout") || "")
const collapsed = Boolean(cookies.get("react-resizable-panels:collapsed"))

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed || false)

  const { accounts, loading, isError } = useAccounts()

  if (loading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorState />
  }

  if (accounts?.length < 1) {
    return <Account />
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen items-stretch"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
      }}
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
          <AccountSwitcher classNames="mx-6" accounts={accounts} isCollapsed={isCollapsed} />
        </div>

        <Separator />

        <Nav links={LINKS} isCollapsed={isCollapsed} accounts={accounts} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={layout[1] || 85}>
        <div className="flex items-center px-4 py-2 h-[52px] justify-end">
          <UserNav />
        </div>
        <Separator />

        <div className="h-[calc(100vh-52px)] overflow-auto p-6 space-y-6">
          <main>{children}</main>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
