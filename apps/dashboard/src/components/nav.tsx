import { ArrowUpRightIcon } from "lucide-react"
import { NavLink } from "react-router-dom"
import { Account } from "~/types/account"
import { buttonVariants } from "@diariofin/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@diariofin/ui/tooltip"
import { cn } from "@diariofin/ui/utils"

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
          <LogoMark className="h-6 w-6" />
        </div>

        <nav className="flex-1 flex-col flex gap-6 px-2 py-8">
          {links.map((link, index) => (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger>
                <NavLink
                  to={link.route}
                  className={({ isActive }) =>
                    cn(buttonVariants({ variant: isActive ? "glow" : "ghost", size: "icon" }))
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                  >
                    <path
                      opacity="0.4"
                      d="M8.36333 1.84791C8.71985 1.64549 9.17284 1.76686 9.38041 2.1204C10.5548 4.12068 13.4469 4.12071 14.6212 2.1205C14.8287 1.76695 15.2817 1.64559 15.6383 1.84801L19.1024 3.81482C19.277 3.91396 19.4045 4.07898 19.4565 4.27294C19.5085 4.46689 19.4805 4.67358 19.3788 4.84674C18.2403 6.78608 19.6948 9.28336 22 9.28336C22.4142 9.28336 22.75 9.61914 22.75 10.0334V13.967C22.75 14.3812 22.4142 14.717 22 14.717C19.6954 14.717 18.2416 17.2138 19.3804 19.1535C19.4821 19.3267 19.51 19.5333 19.4581 19.7273C19.4061 19.9213 19.2786 20.0863 19.1039 20.1854L15.6398 22.1522C15.2833 22.3547 14.8303 22.2333 14.6228 21.8797C13.4477 19.8783 10.5539 19.8784 9.37882 21.8798C9.17126 22.2334 8.71827 22.3547 8.36175 22.1523L4.89765 20.1855C4.72303 20.0864 4.59546 19.9214 4.5435 19.7274C4.49154 19.5334 4.51952 19.3268 4.62118 19.1536C5.75974 17.2143 4.30517 14.717 2 14.717C1.58579 14.717 1.25 14.3812 1.25 13.967V10.0334C1.25 9.61914 1.58579 9.28336 2 9.28336C4.30575 9.28336 5.76109 6.78558 4.62276 4.84665C4.5211 4.67349 4.49312 4.4668 4.54508 4.27284C4.59704 4.07888 4.72461 3.91387 4.89923 3.81472L8.36333 1.84791Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M9.25015 10C9.25015 8.48122 10.4814 7.25 12.0002 7.25C13.5189 7.25 14.7502 8.48122 14.7502 10C14.7502 11.5188 13.5189 12.75 12.0002 12.75C10.4814 12.75 9.25015 11.5188 9.25015 10Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M12.0001 15.2297C10.7831 15.2297 9.71941 15.89 9.14933 16.8755C8.94192 17.2341 8.48313 17.3566 8.12458 17.1492C7.76603 16.9418 7.64351 16.483 7.85092 16.1244C8.6781 14.6945 10.226 13.7297 12.0001 13.7297C13.7742 13.7297 15.3222 14.6945 16.1493 16.1244C16.3567 16.483 16.2342 16.9418 15.8757 17.1492C15.5171 17.3566 15.0583 17.2341 14.8509 16.8755C14.2808 15.89 13.2172 15.2297 12.0001 15.2297Z"
                      fill="currentColor"
                    ></path>
                  </svg>
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
      <div className="flex items-center bg-gradient-to-b flex-shrink-0 mx-auto py-5">
        <Logo className="w-32" />
      </div>

      <div className="flex-1 flex-col overflow-y-auto gap-10 flex">
        <nav className="grid gap-2">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.route}
              className={({ isActive }) =>
                cn(buttonVariants({ variant: isActive ? "glow" : "ghost", size: "sm" }), "justify-between")
              }
            >
              <span className="flex items-center gap-2">
                {link.icon}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
            >
              <path
                opacity="0.4"
                d="M8.36333 1.84791C8.71985 1.64549 9.17284 1.76686 9.38041 2.1204C10.5548 4.12068 13.4469 4.12071 14.6212 2.1205C14.8287 1.76695 15.2817 1.64559 15.6383 1.84801L19.1024 3.81482C19.277 3.91396 19.4045 4.07898 19.4565 4.27294C19.5085 4.46689 19.4805 4.67358 19.3788 4.84674C18.2403 6.78608 19.6948 9.28336 22 9.28336C22.4142 9.28336 22.75 9.61914 22.75 10.0334V13.967C22.75 14.3812 22.4142 14.717 22 14.717C19.6954 14.717 18.2416 17.2138 19.3804 19.1535C19.4821 19.3267 19.51 19.5333 19.4581 19.7273C19.4061 19.9213 19.2786 20.0863 19.1039 20.1854L15.6398 22.1522C15.2833 22.3547 14.8303 22.2333 14.6228 21.8797C13.4477 19.8783 10.5539 19.8784 9.37882 21.8798C9.17126 22.2334 8.71827 22.3547 8.36175 22.1523L4.89765 20.1855C4.72303 20.0864 4.59546 19.9214 4.5435 19.7274C4.49154 19.5334 4.51952 19.3268 4.62118 19.1536C5.75974 17.2143 4.30517 14.717 2 14.717C1.58579 14.717 1.25 14.3812 1.25 13.967V10.0334C1.25 9.61914 1.58579 9.28336 2 9.28336C4.30575 9.28336 5.76109 6.78558 4.62276 4.84665C4.5211 4.67349 4.49312 4.4668 4.54508 4.27284C4.59704 4.07888 4.72461 3.91387 4.89923 3.81472L8.36333 1.84791Z"
                fill="currentColor"
              ></path>
              <path
                d="M9.25015 10C9.25015 8.48122 10.4814 7.25 12.0002 7.25C13.5189 7.25 14.7502 8.48122 14.7502 10C14.7502 11.5188 13.5189 12.75 12.0002 12.75C10.4814 12.75 9.25015 11.5188 9.25015 10Z"
                fill="currentColor"
              ></path>
              <path
                d="M12.0001 15.2297C10.7831 15.2297 9.71941 15.89 9.14933 16.8755C8.94192 17.2341 8.48313 17.3566 8.12458 17.1492C7.76603 16.9418 7.64351 16.483 7.85092 16.1244C8.6781 14.6945 10.226 13.7297 12.0001 13.7297C13.7742 13.7297 15.3222 14.6945 16.1493 16.1244C16.3567 16.483 16.2342 16.9418 15.8757 17.1492C15.5171 17.3566 15.0583 17.2341 14.8509 16.8755C14.2808 15.89 13.2172 15.2297 12.0001 15.2297Z"
                fill="currentColor"
              ></path>
            </svg>
            Configurações
          </span>
        </NavLink>
      </div>
    </div>
  )
}
