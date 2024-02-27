import { ReactNode } from "react"
import { ArrowRightLeft, Factory, FileDown, LandmarkIcon, LayoutDashboard, TagIcon } from "lucide-react"

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
    label: "Contas",
    route: "/accounts",
    icon: <LandmarkIcon size={16} />,
  },
  {
    label: "Categorias",
    route: "/categories",
    icon: <TagIcon size={16} />,
  },
]
