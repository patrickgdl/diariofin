import { LucideIcon } from "lucide-react"
import { NavLink } from "react-router-dom"

import { buttonVariants } from "~/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"
import { cn } from "~/utils/cn"

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    icon: LucideIcon
    route: string
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-4 data-[collapsed=true]:py-4">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
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
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && <span className="ml-auto text-muted-foreground">{link.label}</span>}
              </TooltipContent>
            </Tooltip>
          ) : (
            <NavLink
              key={index}
              to={link.route}
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }),
                  isActive &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white [&>span]:text-background [&>span]dark:text-white",
                  "group justify-start"
                )
              }
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && <span className="ml-auto">{link.label}</span>}
            </NavLink>
          )
        )}
      </nav>
    </div>
  )
}
