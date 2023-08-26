import { Link } from "react-router-dom"
import { cn } from "~/utils/cn"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link to="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Entradas e Saídas
      </Link>
      <Link to="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Clientes e Fornecedores
      </Link>
      <Link to="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Relatórios
      </Link>
    </nav>
  )
}
