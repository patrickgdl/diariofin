import { ArrowUpRightIcon } from "lucide-react"
import { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import useAppContext from "~/hooks/useAppContext"
import { buttonVariants } from "~/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"
import { cn } from "~/utils/cn"

interface NavProps {
  isCollapsed: boolean
  links: {
    label?: string
    icon: ReactNode
    route: string
    noShortcutNumber?: boolean
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  const { accounts } = useAppContext()

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

        <div className="flex flex-col gap-2 text-sm">
          <span className="px-2 text-xs font-medium leading-relaxed text-gray-600">Contas</span>

          <div className="flex flex-col gap-1">
            {accounts.length > 0 &&
              accounts.map((account) => (
                <NavLink
                  key={account.id}
                  to={`/dashboard/${account.id}`}
                  className="flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <span className="inline-flex items-center gap-2 font-medium">{account.name}</span>

                  <ArrowUpRightIcon size={16} />
                </NavLink>
              ))}
          </div>
        </div>
      </nav>
    </div>
  )
}
