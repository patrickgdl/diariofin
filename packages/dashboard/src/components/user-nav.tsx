import { Link } from "react-router-dom"
import { useUser } from "~/contexts/UserContext"
import useSupabase from "~/hooks/useSupabase"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Button } from "~/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/dropdown-menu"
import { getAcronym } from "~/utils/get-acronym"

export function UserNav() {
  const supabase = useSupabase()
  const { user, isLoading } = useUser()

  if (!user || isLoading) return <div className="h-8 w-8 rounded-full bg-gray-200" />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
            <AvatarFallback>{getAcronym(user.name ?? "Ano Nimo")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name ?? ""}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email ?? ""}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/settings/profile">Perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/accounts">Contas</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings">Configurações</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/accounts/new">Nova conta</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => supabase.auth.signOut()}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
