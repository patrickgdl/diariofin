import { MenuIcon } from "lucide-react"
import React from "react"
import { NavLink } from "react-router-dom"
import { Button, buttonVariants } from "~/ui/button"
import { Dialog, DialogContent } from "~/ui/dialog"
import { cn } from "~/utils/cn"
import { LinkProps } from "~/utils/constants"

import Logo from "./logo"

interface MobileNavProps {
  links: LinkProps[]
}

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)} className="flex md:hidden">
        <MenuIcon />
      </Button>

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex items-center mx-auto">
            <Logo className="w-32" />
          </div>

          <nav className="flex flex-col space-y-1">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.route}
                onClick={() => setOpen(false)}
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
        </DialogContent>
      </Dialog>
    </>
  )
}
