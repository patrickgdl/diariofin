import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AccountFormType } from "~/components/account-form"
import supabase from "~/services/supabase"
import { Account } from "~/types/account"
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"

import AccountSwitcher from "./components/account-switcher"
import { Consolidated } from "./components/consolidated"
import { CalendarDateRangePicker } from "./components/date-range-picker"
import { MainNav } from "./components/main-nav"
import { Overview } from "./components/overview"
import { Search } from "./components/search"
import { UserNav } from "./components/user-nav"

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

export default function DashboardPage() {
  const params = useParams()
  const navigate = useNavigate()

  const [accounts, setAccounts] = React.useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = React.useState<Account>(defaultAccount)

  const getAccountById = async () => {
    if (params?.accountId) {
      const { data, error } = await supabase.from("account").select("*").eq("id", params.accountId).single()

      if (error) return alert(JSON.stringify(error))

      setSelectedAccount(data)
    }
  }

  const getAccounts = async () => {
    const { data, error } = await supabase.from("account").select("*")

    if (error) return alert(JSON.stringify(error))

    setAccounts(data)
  }

  const handleNewAccount = async (values: AccountFormType) => {
    const { data, error } = await supabase
      .from("account")
      .insert({ ...values })
      .select()

    if (error) return alert(JSON.stringify(error))

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
    <div className="flex flex-col">
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
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />

            {accounts && accounts?.length > 0 && (
              <AccountSwitcher
                accounts={accounts}
                selectedAccount={selectedAccount}
                onNewAccount={handleNewAccount}
                onSelectAccount={handleSelectNewAccount}
              />
            )}
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Análise
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Relatórios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saldo atual</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 45.231,89</div>
                  <p className="text-xs text-muted-foreground">+20.1% no último mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recebidos</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 12.321,00</div>
                  <p className="text-xs text-muted-foreground">+180.1% no último mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Despesas</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 89.121,20</div>
                  <p className="text-xs text-muted-foreground">+19% no último mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Vencidos a receber</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 531,30</div>
                  <p className="text-xs text-muted-foreground">+201 no último mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Vencidos a pagar</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 1.231,20</div>
                  <p className="text-xs text-muted-foreground">+23 no último mês</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Fluxo de Caixa</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Consolidado mês a mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <Consolidated />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
