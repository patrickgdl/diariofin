import { Navigate, Outlet } from "react-router-dom"
import { useSessionContext } from "~/contexts/SessionContext"

import Layout from "./layout"
import Loader from "./loader"

const ProtectedRoute = () => {
  const { session, isLoading } = useSessionContext()

  if (isLoading) {
    return <Loader />
  }

  // user is not authenticated
  if (!session) {
    return <Navigate to="/login" />
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default ProtectedRoute
