import cookies from "js-cookie"
import * as React from "react"
import { Outlet } from "react-router-dom"
import useAccounts from "~/hooks/useAccountsQuery"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"
import { Separator } from "~/ui/separator"
import { cn } from "~/utils/cn"
import { LINKS } from "~/utils/constants"

import AccountSwitcher from "./account-switcher"
import { Nav } from "./nav"
import { UserNav } from "./user-nav"

const layout = JSON.parse(cookies.get("react-resizable-panels:layout") || "")
const collapsed = Boolean(cookies.get("react-resizable-panels:collapsed"))

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed || false)

  const { accounts, isLoading, isError } = useAccounts()

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
          {isLoading || isError ? null : (
            <AccountSwitcher classNames={"mx-6"} accounts={accounts} isCollapsed={isCollapsed} />
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
