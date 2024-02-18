import { Loader2 } from "lucide-react"

import { Button } from "./button"

export function ButtonLoading({ label }: { label: string }) {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {label ? label : "Aguarde"}
    </Button>
  )
}
