import {
  ArrowUpRightIcon,
  BarChartIcon,
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  Settings,
  ShieldCloseIcon,
  MenuIcon,
  UsersIcon,
} from "lucide-react"
import * as React from "react"
import useAccounts from "~/hooks/useAccountsQuery"
import OnboardingPage from "~/pages/onboarding"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"
import { Separator } from "~/ui/separator"
import { cn } from "~/utils/cn"
import { LINKS, LOCAL_STORAGE_KEYS } from "~/utils/constants"

import ErrorState from "./error-state"
import Loader from "./loader"
import { Nav } from "./nav"
import { ThemeToggle } from "./theme-toggle"
import { UserNav } from "./user-nav"

import useMediaQuery from "~/hooks/use-media-query"
import { MobileNav } from "./mobile-nav"
import { useLocalStorageQuery } from "~/hooks/use-local-storage"
import { CommandMenu } from "./command-menu"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useLocalStorageQuery<boolean>(LOCAL_STORAGE_KEYS.SIDEBAR_IS_COLLAPSED, false)
  const [sizes, setSizes] = useLocalStorageQuery<number[]>(LOCAL_STORAGE_KEYS.SIDEBAR_SIZES, [13, 87])

  const { isMobile } = useMediaQuery()
  const { accounts, loading, isError } = useAccounts()

  if (loading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorState />
  }

  if (accounts?.length < 1) {
    return <OnboardingPage />
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen items-stretch"
      onLayout={(sizes: number[]) => setSizes(sizes)}
    >
      {!isMobile && (
        <>
          <ResizablePanel
            defaultSize={sizes[0] || 13}
            minSize={13}
            maxSize={15}
            collapsible
            collapsedSize={5}
            onCollapse={() => setIsCollapsed(true)}
            onExpand={() => setIsCollapsed(false)}
            className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out hidden md:flex")}
          >
            <Nav links={LINKS} isCollapsed={isCollapsed} accounts={accounts} />
          </ResizablePanel>
          <ResizableHandle withHandle />
        </>
      )}

      <ResizablePanel defaultSize={sizes[1] || 87}>
        <div className="flex items-center px-4 md:px-12 py-2 h-[52px] justify-between md:justify-end space-x-4">
          <MobileNav links={LINKS} />

          <div className="flex items-center py-2 h-[52px] space-x-4">
            <ThemeToggle />

            <UserNav />
          </div>
        </div>
        <Separator />

        <div className="h-[calc(100vh-52px)] overflow-auto space-y-6">
          <main className="h-full">{children}</main>

          <CommandMenu />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
