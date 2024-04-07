import { ReactNode } from "react"
import { ArrowRightLeft, CreditCardIcon, FileDown, LayoutDashboard, LucideIcon, TagIcon } from "lucide-react"

export type LinkProps = { route: string; label: string; icon: LucideIcon }

export const LINKS: LinkProps[] = [
  { label: "Dashboard", route: "/overview", icon: LayoutDashboard },
  {
    label: "Transações",
    route: "/transactions",
    icon: ArrowRightLeft,
  },
  // {
  //   label: "Clientes",
  //   route: "/clients",
  //   icon: Factory,
  // },
  {
    label: "Contas",
    route: "/accounts",
    icon: CreditCardIcon,
  },
  {
    label: "Categorias",
    route: "/categories",
    icon: TagIcon,
  },
  // {
  //   label: "Relatórios",
  //   route: "/reports",
  //   icon: FileDown,
  // },
]

export const LOCAL_STORAGE_KEYS = {
  ONBOARDING_ACCOUNTS: "onboarding-accounts",
  ONBOARDING_CATEGORIES: "onboarding-categories",
  SIDEBAR_IS_COLLAPSED: "sidebar-is-collapsed",
  SIDEBAR_SIZES: "sidebar-sizes",
}
