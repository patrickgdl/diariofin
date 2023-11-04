import { NavLink } from "react-router-dom"

import { cn } from "~/utils/cn"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "" : "text-muted-foreground")
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/transactions"
        className={({ isActive }) =>
          cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "" : "text-muted-foreground")
        }
      >
        Entradas e Saídas
      </NavLink>
      <NavLink
        to="/clients"
        className={({ isActive }) =>
          cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "" : "text-muted-foreground")
        }
      >
        Clientes e Fornecedores
      </NavLink>
      <NavLink
        to="/reports"
        className={({ isActive }) =>
          cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "" : "text-muted-foreground")
        }
      >
        Relatórios
      </NavLink>
    </nav>
  )
}
