import { ArrowUpRightIcon, Settings } from "lucide-react"
import { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { Account } from "~/types/account"
import { buttonVariants } from "~/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"
import { cn } from "~/utils/cn"

interface NavProps {
  isCollapsed: boolean
  links: {
    label?: string
    icon: ReactNode
    route: string
  }[]
  accounts: Array<Account>
}

const chartdata = [
  {
    month: "Jan 21",
    Performance: 4000,
  },
  {
    month: "Feb 21",
    Performance: 3000,
  },
  {
    month: "Mar 21",
    Performance: 2000,
  },
  {
    month: "Apr 21",
    Performance: 2780,
  },
  {
    month: "May 21",
    Performance: 1890,
  },
  {
    month: "Jun 21",
    Performance: 2390,
  },
  {
    month: "Jul 21",
    Performance: 3490,
  },
]

export function Nav({ links, isCollapsed, accounts }: NavProps) {
  return (
    <div data-collapsed={isCollapsed} className="group h-screen flex-1 flex flex-col data-[collapsed=true]:py-4 px-4">
      <div className="flex items-center flex-shrink-0 px-4 py-5">
        <div className="h-8 w-auto" />
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto gap-10">
        <nav className="grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger>
                  <NavLink
                    to={link.route}
                    className={({ isActive }) =>
                      cn(buttonVariants({ variant: isActive ? "default" : "ghost", size: "icon" }), "h-9 w-9")
                    }
                  >
                    {link.icon}
                    <span className="sr-only">{link.label}</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.label}
                </TooltipContent>
              </Tooltip>
            ) : (
              <NavLink
                key={index}
                to={link.route}
                className={({ isActive }) =>
                  cn(buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }), "justify-between")
                }
              >
                <span className="flex items-center gap-2">
                  {link.icon}
                  {link.label}
                </span>
              </NavLink>
            )
          )}
        </nav>

        <div className="flex flex-col gap-2 px-4 group-[[data-collapsed=true]]:hidden">
          {accounts?.length > 0 ? (
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase">Contas</span>

              <div className="flex flex-col gap-1 py-4">
                {accounts.map((account) => (
                  <NavLink
                    to={`/dashboard/${account.id}`}
                    key={account.id}
                    className="flex items-center justify-between py-1"
                  >
                    <span className="text-sm font-medium">{account.name}</span>

                    {/* <div className="flex items-center space-x-2">
                      <SparkAreaChart
                        data={chartdata}
                        categories={["Performance"]}
                        index={"month"}
                        colors={["emerald"]}
                        className="h-6 w-12"
                      />

                      <div className="flex space-x-2">
                        <span className="rounded bg-emerald-500 text-xs text-white px-0.5">+1.72%</span>
                      </div>
                    </div> */}

                    <ArrowUpRightIcon className="h-4 w-4 text-primary" />
                  </NavLink>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex-shrink-0 flex py-4">
        {isCollapsed ? (
          <div className="flex mx-auto">
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    cn(buttonVariants({ variant: isActive ? "default" : "ghost", size: "icon" }), "h-9 w-9")
                  }
                >
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Configurações</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                Configurações
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <NavLink to="/settings" className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-start")}>
            <span className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </span>
          </NavLink>
        )}
      </div>
    </div>
  )
}
