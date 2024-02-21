import { useState } from "react"
import { Link } from "react-router-dom"
import Google from "~/components/icons/google"
import { Button } from "~/ui/button"

export default function RegisterForm() {
  const [clickedGoogle, setClickedGoogle] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setClickedGoogle(true)
        }}
      >
        <Google className="h-4 w-4 mr-2" /> Continuar com Google
      </Button>

      <p className="text-center text-sm text-gray-500">
        Já tem uma conta?{" "}
        <Link to="/login" className="font-semibold text-gray-500 transition-colors hover:text-black">
          Entre
        </Link>
      </p>
    </>
  )
}
