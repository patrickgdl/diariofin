import { useSessionContext } from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import supabase from "~/services/supabase"

export default function Login() {
  const [role, setRole] = React.useState<"user" | "admin" | null>(null)
  const { session, isLoading: isLoadingUser } = useSessionContext()

  const getUserDetails = () => supabase.from("users").select("*").single()

  useEffect(() => {
    if (!isLoadingUser && session) {
      getUserDetails().then(({ data: userDetails }) => {
        const role = userDetails?.role || "user"
        setRole(role)
      })
    }
  }, [isLoadingUser, session])

  if (!isLoadingUser && session && role) {
    return <Navigate to={role === "admin" ? "/selector" : "/template"} />
  }

  if (isLoadingUser) {
    return <div>Carregando...</div>
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "black",
                brandAccent: "black",
              },
            },
          },
        }}
        providers={["google", "facebook"]}
        localization={{
          variables: {
            sign_in: {
              email_label: "Seu e-mail",
              password_label: "Sua senha",
              email_input_placeholder: "Seu e-mail",
              password_input_placeholder: "Sua senha",
              button_label: "Entrar",
              loading_button_label: "Entrando...",
              social_provider_text: "Logue com {{provider}}",
              link_text: "Já tem uma conta? Entre",
            },
            forgotten_password: {
              email_label: "Seu e-mail",
              password_label: "Sua senha",
              email_input_placeholder: "Seu e-mail",
              button_label: "Enviar",
              loading_button_label: "Enviando...",
              link_text: "Esqueceu sua senha?",
              confirmation_text: "Um e-mail foi enviado para você",
            },
            sign_up: {
              email_label: "Seu e-mail",
              password_label: "Sua senha",
              email_input_placeholder: "Seu e-mail",
              password_input_placeholder: "Sua senha",
              button_label: "Cadastrar",
              loading_button_label: "Cadastrando...",
              social_provider_text: "Cadastre-se com {{provider}}",
              link_text: "Não tem uma conta? Cadastre-se",
            },
          },
        }}
      />
    </div>
  )
}
