import { MenuIcon } from "lucide-react"
import React from "react"
import { NavLink } from "react-router-dom"
import { Button, buttonVariants } from "@fluxozen/ui/button"
import { Drawer, DrawerContent } from "@fluxozen/ui/drawer"
import { cn } from "@fluxozen/ui/utils"
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

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="px-4 py-8">
            <nav className="flex flex-col space-y-1">
              {links.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.route}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(buttonVariants({ variant: isActive ? "glow" : "ghost", size: "sm" }), "justify-between")
                  }
                >
                  <span className="flex items-center gap-2">
                    <link.icon size={16} />
                    {link.label}
                  </span>
                </NavLink>
              ))}
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
