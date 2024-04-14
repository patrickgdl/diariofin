import { Outlet } from "react-router-dom"
import { Separator } from "@fluxozen/ui/separator"

import { SidebarNav } from "./components/sidebar-nav"

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/settings/profile",
  },
  {
    title: "Aparência",
    href: "/settings/appearance",
  },
]

export default function SettingsLayout() {
  return (
    <div className="pb-16">
      <div className="space-y-0.5 px-4 py-2">
        <h2 className="text-lg font-bold tracking-tight">Configurações</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie as configurações da sua conta e defina suas preferências.
        </p>
      </div>

      <Separator className="mb-4" />

      <div className="flex flex-col space-y-8 px-6 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
