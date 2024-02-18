import { Outlet } from "react-router-dom"
import { Separator } from "~/ui/separator"

import { SidebarNav } from "./components/sidebar-nav"

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/settings/profile",
  },
  {
    title: "Contas",
    href: "/settings/accounts",
  },
  {
    title: "Aparência",
    href: "/settings/appearance",
  },
]

export default function SettingsLayout() {
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">Gerencie as configurações da sua conta e defina suas preferências.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
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
