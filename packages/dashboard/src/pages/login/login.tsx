import * as React from "react"
import { Link, Navigate } from "react-router-dom"
import Loader from "~/components/loader"
import Logo from "~/components/logo"
import { useSessionContext } from "~/contexts/SessionContext"

import LoginForm from "./components/login-form"

export default function Login() {
  const [role, setRole] = React.useState<"user" | "admin" | null>(null)

  const { session, isLoading: isLoadingUser } = useSessionContext()

  if (isLoadingUser) return <Loader />

  if (session) {
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} />
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="relative z-10 h-fit w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <Link to="/">
            <Logo className="h-10 w-10" />
          </Link>
          <h3 className="text-xl font-semibold">Entre</h3>
          <p className="text-sm text-gray-500">Comece a gerenciar seu negócio agora mesmo</p>
        </div>
        <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
