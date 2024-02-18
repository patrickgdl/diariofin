import { ReactNode } from "react"
import { ArrowRightLeft, Factory, FileDown, LayoutDashboard, Settings } from "lucide-react"

export const LINKS: { route: string; label: string; icon: ReactNode }[] = [
  { label: "Dashboard", route: "/dashboard", icon: <LayoutDashboard size={16} /> },
  {
    label: "Entradas e Saídas",
    route: "/transactions",
    icon: <ArrowRightLeft size={16} />,
  },
  {
    label: "Clientes e Fornecedores",
    route: "/clients",
    icon: <Factory size={16} />,
  },
  {
    label: "Relatórios",
    route: "/reports",
    icon: <FileDown size={16} />,
  },
  {
    label: "Configurações",
    route: "/settings",
    icon: <Settings size={16} />,
  },
]
