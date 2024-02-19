import { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { buttonVariants } from "~/ui/button"
import { SparkAreaChart } from "@tremor/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"
import { cn } from "~/utils/cn"
import { Account } from "~/types/account"

interface NavProps {
  isCollapsed: boolean
  links: {
    label?: string
    icon: ReactNode
    route: string
    noShortcutNumber?: boolean
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
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-4 data-[collapsed=true]:py-4">
      <nav className="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger>
                <NavLink
                  to={link.route}
                  className={({ isActive }) =>
                    cn(
                      buttonVariants({ variant: isActive ? "default" : "ghost", size: "icon" }),
                      "h-9 w-9",
                      isActive && "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )
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
                cn(
                  buttonVariants({ variant: isActive ? "default" : "ghost" }),
                  isActive &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white [&>span]:text-background [&>span]dark:text-white",
                  "group justify-between"
                )
              }
            >
              <span className="flex items-center gap-2">
                {link.icon}
                {link.label}
              </span>
              {/* {TODO: add shortcut options with useKeyPress} */}
              {false && (
                <span
                  className={cn(
                    "hidden h-5 w-5 place-content-center rounded border border-gray-200 bg-gray-100 text-xs font-medium !text-gray-500 transition-colors duration-200 group-hover:border-gray-300 lg:grid"
                  )}
                  title={`Chave de atalho: ${index + 1}`}
                >
                  {index + 1}
                </span>
              )}
            </NavLink>
          )
        )}

        <hr className="dark:border-muted-foreground my-6" />

        {accounts?.length > 0 ? (
          <div className="flex flex-col gap-2 text-sm group-[[data-collapsed=true]]:hidden">
            <span className="px-2 text-sm font-medium leading-relaxed text-gray-600">Contas</span>

            <div className="flex flex-col gap-1">
              {accounts.map((account) => (
                <NavLink to={`/dashboard/${account.id}`} key={account.id} className="flex justify-between px-4 py-2">
                  <div className="flex items-center">
                    <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                      {account.name}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <SparkAreaChart
                      data={chartdata}
                      categories={["Performance"]}
                      index={"month"}
                      colors={["emerald"]}
                      className="h-8 w-10"
                    />

                    <div className="flex space-x-2">
                      <span className="rounded bg-emerald-500 text-xs text-white px-0.5">+1.72%</span>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        ) : null}
      </nav>
    </div>
  )
}
