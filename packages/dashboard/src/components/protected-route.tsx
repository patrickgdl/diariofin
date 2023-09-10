import { Navigate } from "react-router-dom"

import { useSessionContext } from "@supabase/auth-helpers-react"

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, isLoading: isLoadingUser } = useSessionContext()

  if (!isLoadingUser && !session) {
    // user is not authenticated
    return <Navigate to="/" />
  }

  if (isLoadingUser) {
    return <div>Carregando...</div>
  }

  return children
}

export default ProtectedRoute
