import { useSessionContext } from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import supabase from "~/services/supabase"

export default function Login() {
  const [role, setRole] = React.useState<"user" | "admin" | null>(null)
  const { session, isLoading: isLoadingUser } = useSessionContext()

  if (!isLoadingUser && session) {
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} />
  }

  if (isLoadingUser) {
    return <div>Carregando...</div>
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Auth
        supabaseClient={supabase}
        appearance={{
          className: {
            anchor: "!text-sm !text-muted-foreground hover:!text-brand !underline !underline-offset-4",
            button:
              "!bg-primary !text-sm !text-primary-foreground hover:!bg-primary/90 !rounded-md !h-10 sm:!h-9 sm:!px-3 lg:!h-11 lg:!px-8",
            container: "",
            divider: "!bg-input",
            input:
              "!h-10 !rounded-md border !border-input !bg-transparent !px-3 !py-2 !text-sm !ring-offset-background file:!border-0 file:!bg-transparent file:!text-sm file:!font-medium placeholder:!text-muted-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50",
            label: "!mb-2 !text-xs hover:!cursor-pointer",
            loader: "w-4 h-4 mr-2 animate-spin",
            message: "!text-xs !text-red-600",
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
