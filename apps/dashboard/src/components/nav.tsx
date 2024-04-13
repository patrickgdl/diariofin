import { ArrowUpRightIcon, Settings } from "lucide-react"
import { NavLink } from "react-router-dom"
import { Account } from "~/types/account"
import { buttonVariants } from "@fluxozen/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@fluxozen/ui/tooltip"
import { cn } from "@fluxozen/ui/utils"

import Logo from "./logo"
import LogoMark from "./logo-mark"
import { LinkProps } from "~/utils/constants"

interface NavProps {
  isCollapsed: boolean
  links: LinkProps[]
  accounts: Array<Account>
}

export function Nav({ links, isCollapsed, accounts }: NavProps) {
  if (isCollapsed) {
    return (
      <div data-collapsed="true" className="group h-screen flex-1 hidden md:flex flex-col py-4 px-4">
        <div className="flex items-center flex-shrink-0 mx-auto">
          <LogoMark />
        </div>

        <nav className="flex-1 flex-col flex gap-6 px-2 py-8">
          {links.map((link, index) => (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger>
                <NavLink
                  to={link.route}
                  className={({ isActive }) =>
                    cn(buttonVariants({ variant: isActive ? "default" : "ghost", size: "icon" }))
                  }
                >
                  <link.icon size={22} />
                  <span className="sr-only">{link.label}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        <div className="flex-shrink-0 flex py-4">
          <div className="flex mx-auto">
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    cn(buttonVariants({ variant: isActive ? "default" : "ghost", size: "icon" }))
                  }
                >
                  <Settings size={22} />
                  <span className="sr-only">Configurações</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                Configurações
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-collapsed="false" className="group h-screen flex-1 hidden md:flex flex-col px-4">
      <div className="flex items-center flex-shrink-0 mx-auto py-5">
        <Logo className="w-32" />
      </div>

      <div className="flex-1 flex-col overflow-y-auto gap-10 flex">
        <nav className="grid gap-2">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.route}
              className={({ isActive }) =>
                cn(buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }), "justify-between")
              }
            >
              <span className="flex items-center gap-2">
                <link.icon size={16} />
                {link.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          {accounts?.length > 0 ? (
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase">Contas</span>

              <div className="flex flex-col gap-3 py-4">
                {accounts.map((account) => (
                  <NavLink
                    to={`/overview/${account.id}`}
                    key={account.id}
                    className="flex items-center justify-between py-1"
                  >
                    <span className="text-sm font-medium">{account.name}</span>
                    <ArrowUpRightIcon className="h-4 w-4 text-primary" />
                  </NavLink>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex-shrink-0 flex py-4">
        <NavLink to="/settings" className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-start")}>
          <span className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </span>
        </NavLink>
      </div>
    </div>
  )
}
