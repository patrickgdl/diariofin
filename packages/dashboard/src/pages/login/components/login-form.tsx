import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import Google from "~/components/icons/google"
import useMediaQuery from "~/hooks/use-media-query"
import useSupabase from "~/hooks/useSupabase"
import { Button } from "~/ui/button"
import { Input } from "~/ui/input"
import { toast } from "~/ui/use-toast"

export default function LoginForm() {
  const supabase = useSupabase()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const [clickedEmail, setClickedEmail] = useState(false)
  const [clickedGoogle, setClickedGoogle] = useState(false)
  const [showEmailOption, setShowEmailOption] = useState(false)

  const { isMobile } = useMediaQuery()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setClickedEmail(true)
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${import.meta.env.VITE_APP_URL}/dashboard`,
      },
    })

    if (error) {
      toast({ title: error.message || "Ocorreu um erro ao enviar o link de login.", variant: "destructive" })
    } else {
      toast({ title: "Cheque seu e-mail com o link de login." })
    }

    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setClickedGoogle(true)

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
    <div className="flex flex-col space-y-4">
      <Button onClick={handleGoogleLogin} disabled={clickedEmail}>
        <Google className="h-5 w-5 mr-2" />
        Continuar com Google
      </Button>

      <form onSubmit={handleLogin} className="flex flex-col space-y-3">
        {showEmailOption && (
          <div>
            <div className="mb-4 mt-1 border-t border-gray-300" />
            <Input
              id="email"
              name="email"
              autoFocus={!isMobile}
              type="email"
              placeholder="panic@thedis.co"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
        )}

        <Button
          variant="secondary"
          {...(!showEmailOption && {
            type: "button",
            onClick: (e) => {
              e.preventDefault()
              setShowEmailOption(true)
            },
          })}
          disabled={clickedGoogle}
        >
          Continuar com Email
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Não tem uma conta?{" "}
        <Link to="/register" className="font-semibold text-gray-500 transition-colors hover:text-black">
          Cadastre-se
        </Link>
      </p>
    </div>
  )
}
