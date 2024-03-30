import * as React from "react"
import { Link, Navigate } from "react-router-dom"
import Google from "~/components/icons/google"
import Loader from "~/components/loader"
import { useSessionContext } from "~/contexts/SessionContext"
import useSupabase from "~/hooks/useSupabase"
import { Button } from "~/ui/button"
import { toast } from "~/ui/use-toast"

export default function RegisterForm() {
  const supabase = useSupabase()
  const { session, isLoading: isLoadingUser } = useSessionContext()

  const [role, setRole] = React.useState<"user" | "admin" | null>(null)

  if (isLoadingUser) return <Loader />

  if (session) {
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} />
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${import.meta.env.VITE_APP_URL}/dashboard`,
      },
    })

    if (error) {
      toast({ title: error.message || "Ocorreu um erro ao autenticar com o Google.", variant: "destructive" })
    }
  }

  return (
    <>
      <Button onClick={handleGoogleLogin}>
        <Google className="h-4 w-4 mr-2" /> Continuar com Google
      </Button>

      <p className="text-center text-sm text-gray-500">
        Já tem uma conta?{" "}
        <Link to="/login" className="font-semibold text-gray-500 transition-colors hover:text-gray-600">
          Entre
        </Link>
      </p>
    </>
  )
}
