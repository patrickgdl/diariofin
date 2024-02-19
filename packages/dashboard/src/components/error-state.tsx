import { XCircle } from "lucide-react"
import { Button } from "~/ui/button"

function ErrorState() {
  return (
    <div className="flex h-screen items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <XCircle className="h-10 w-10 text-muted-foreground text-red-400" />

        <h3 className="mt-4 text-lg font-semibold">Ocorreu um erro</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          Algum erro ocorreu e não conseguimos completar a requisição.
        </p>

        <Button size="sm" className="bg-red-500 relative">
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}

export default ErrorState
