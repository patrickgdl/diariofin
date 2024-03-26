import { ReactNode } from "react"
import { ArrowRightLeft, CreditCardIcon, FileDown, LayoutDashboard, TagIcon } from "lucide-react"

export const LINKS: { route: string; label: string; icon: ReactNode }[] = [
  { label: "Dashboard", route: "/dashboard", icon: <LayoutDashboard size={16} /> },
  {
    label: "Transações",
    route: "/transactions",
    icon: <ArrowRightLeft size={16} />,
  },
  // {
  //   label: "Clientes",
  //   route: "/clients",
  //   icon: <Factory size={16} />,
  // },
  {
    label: "Contas",
    route: "/accounts",
    icon: <CreditCardIcon size={16} />,
  },
  {
    label: "Categorias",
    route: "/categories",
    icon: <TagIcon size={16} />,
  },
  // {
  //   label: "Relatórios",
  //   route: "/reports",
  //   icon: <FileDown size={16} />,
  // },
]

export const LOCAL_STORAGE_KEYS = {
  ONBOARDING_ACCOUNTS: "onboarding-accounts",
  ONBOARDING_CATEGORIES: "onboarding-categories",
}
