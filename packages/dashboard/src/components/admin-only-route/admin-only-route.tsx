import { Navigate } from "react-router-dom"

import { useSessionContext } from "@supabase/auth-helpers-react"
import useUserRole from "~/hooks/useUserRole"

const AdminOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const role = useUserRole()
  const { session, isLoading: isLoadingUser } = useSessionContext()

  if (isLoadingUser) {
    return <div>Carregando...</div>
  }

  if (!isLoadingUser && (!session || role !== "admin")) {
    // user is not authenticated or is not an admin
    return <Navigate to="/" />
  }

  return children
}

export default AdminOnlyRoute
