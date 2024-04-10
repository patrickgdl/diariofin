import { PlusCircledIcon } from "@radix-ui/react-icons"
import { Search } from "lucide-react"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import useMediaQuery from "~/hooks/use-media-query"
import { Account } from "~/types/account"
import { Button } from "~/ui/button"
import { Drawer, DrawerContent } from "~/ui/drawer"
import { Input } from "~/ui/input"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"
import { Separator } from "~/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"

import { AccountsDisplay } from "./accounts-display"
import { AccountsList } from "./accounts-list"

interface AccountsDashboardProps {
  accounts: Account[]
  onDeactivate: (account: Account) => void
}

export function AccountsDashboard({ accounts, onDeactivate }: AccountsDashboardProps) {
  const navigate = useNavigate()
  const { isDesktop } = useMediaQuery()
  const [selected, setSelected] = React.useState<Account | null>(null)

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full max-h-[1200px] items-stretch">
      <ResizablePanel order={1} id="accounts" defaultSize={isDesktop ? 50 : 100} minSize={30}>
        <Tabs defaultValue="all">
          <div className="flex h-[52px] items-center px-4 py-2">
            <h1 className="text-lg font-medium">Contas</h1>

            <div className="ml-auto space-x-1 flex items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => navigate("/accounts/new")}>
                    <PlusCircledIcon className="h-4 w-4" />
                    <span className="sr-only">Adicionar nova conta</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Adicionar nova conta</TooltipContent>
              </Tooltip>

              <TabsList>
                <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                  Todas as contas
                </TabsTrigger>
                <TabsTrigger value="inactives" className="text-zinc-600 dark:text-zinc-200">
                  Inativos
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <Separator />

          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar" className="pl-8" />
              </div>
            </form>
          </div>

          <TabsContent value="all" className="m-0">
            <AccountsList items={accounts} onSelect={setSelected} />
          </TabsContent>
          <TabsContent value="inactives" className="m-0">
            <AccountsList items={accounts.filter((item) => !item.active)} onSelect={setSelected} />
          </TabsContent>
        </Tabs>
      </ResizablePanel>

      {isDesktop ? (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel order={2} id="account-display" defaultSize={50}>
            {selected ? (
              <AccountsDisplay
                account={selected}
                onDeactivate={onDeactivate}
                onEdit={(acc) => navigate(`/accounts/${acc.id}`)}
              />
            ) : (
              <div className="p-8 text-center text-muted-foreground">Sem conta selecionada</div>
            )}
          </ResizablePanel>
        </>
      ) : (
        <Drawer open={Boolean(selected)} onClose={() => setSelected(null)}>
          <DrawerContent>
            {selected && (
              <AccountsDisplay
                account={selected}
                onDeactivate={onDeactivate}
                onEdit={(acc) => navigate(`/accounts/${acc.id}`)}
              />
            )}
          </DrawerContent>
        </Drawer>
      )}
    </ResizablePanelGroup>
  )
}
