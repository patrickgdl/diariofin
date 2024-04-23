import { useLogSnag } from "@logsnag/react"
import { Link } from "react-router-dom"
import { useUser } from "~/contexts/UserContext"
import { LogEvents } from "~/events/events"
import useSupabase from "~/hooks/useSupabase"
import { Avatar, AvatarFallback, AvatarImage } from "@diariofin/ui/avatar"
import { Button } from "@diariofin/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@diariofin/ui/dropdown-menu"
import { getAcronym } from "~/utils/get-acronym"

export function UserNav() {
  const logsnag = useLogSnag()
  const supabase = useSupabase()
  const { user, isLoading } = useUser()

  if (!user || isLoading) return <div className="h-8 w-8 rounded-full bg-gray-200" />

  const handleLogout = async () => {
    await supabase.auth.signOut()

    logsnag.track({
      event: LogEvents.SignOut.name,
      icon: LogEvents.SignOut.icon,
      channel: LogEvents.SignOut.channel,
    })
    logsnag.clearUserId()
  }

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
        <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
