import { Home, ArrowRightLeft, Factory, FileDown, LayoutDashboard } from "lucide-react"
import * as React from "react"
import { Link, Outlet, Params, useMatches, useNavigate, useParams } from "react-router-dom"
import { AccountFormType } from "~/components/account-form"
import { Account } from "~/types/account"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"
import { Separator } from "~/ui/separator"
import { cn } from "~/utils/cn"
import cookies from "js-cookie"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "~/ui/breadcrumb"

import AccountSwitcher from "./account-switcher"
import { Nav } from "./nav"
import { useToast } from "~/ui/use-toast"
import supabase from "~/services/supabase"
import useAppContext from "~/hooks/useAppContext"
import { UserNav } from "./user-nav"

interface IMatches {
  id: string
  pathname: string
  params: Params<string>
  data: unknown
  handle: {
    crumb: {
      label: string
      route: string
    }
  }
}

const layout = JSON.parse(cookies.get("react-resizable-panels:layout") || "")
const collapsed = Boolean(cookies.get("react-resizable-panels:collapsed"))

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed || false)

  const params = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()

  const { selectedAccount, setSelectedAccount, setAccounts, accounts } = useAppContext()

  let matches = useMatches() as IMatches[]
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb)

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
          <AccountSwitcher
            classNames={isCollapsed ? "mx-6" : ""}
            isCollapsed={isCollapsed}
            accounts={accounts}
            selectedAccount={selectedAccount}
            onNewAccount={handleNewAccount}
            onSelectAccount={handleSelectNewAccount}
          />
        </div>
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Dashboard",
              route: "/dashboard",
              icon: LayoutDashboard,
            },
            {
              title: "Entradas e Saídas",
              route: "/transactions",
              icon: ArrowRightLeft,
            },
            {
              title: "Clientes e Fornecedores",
              route: "/clients",
              icon: Factory,
            },
            {
              title: "Relatórios",
              route: "/reports",
              icon: FileDown,
            },
          ]}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={layout[1] || 85}>
        <div className="flex items-center px-4 py-2 h-[52px] justify-end">
          <UserNav />
        </div>
        <Separator />

        <main className="h-[calc(100vh-52px)] overflow-auto">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} className="flex items-center gap-2" href="/">
                <Home className="h-4 w-4" />
                <span className="inline-block font-bold">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {crumbs.map((crumb, index) => (
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink as={Link} href={crumb?.route}>
                  {crumb?.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>

          <Outlet />
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
