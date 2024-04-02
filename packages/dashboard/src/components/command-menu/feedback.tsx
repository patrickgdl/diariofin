import { BackButton } from "~/components/command-menu/back-button"
import { Button } from "~/ui/button"
import { Textarea } from "~/ui/textarea"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export function CommandFeedback() {
  const [value, setValue] = useState("")

  const status: string = ""

  return (
    <div className="h-full">
      <div className="p-5 flex items-center space-x-3">
        <BackButton />
        <h2>Enviar Feedback</h2>
      </div>
      <div className="p-4">
        {status === "hasSucceeded" ? (
          <div className="min-h-[100px] flex items-center justify-center flex-col space-y-1 mt-12">
            <p className="font-medium text-sm">Obrigado pelo seu feedback!</p>
            <p className="text-sm text-[#4C4C4C]">Te retornaremos o mais breve possível</p>
          </div>
        ) : (
          <form className="space-y-4">
            <Textarea
              name="feedback"
              value={value}
              required
              autoFocus
              placeholder="Seu feedback..."
              className="min-h-[200px] resize-none"
              onChange={(evt) => setValue(evt.target.value)}
            />

            <div className="mt-1 flex items-center justify-end">
              <Button
                type="button"
                // onClick={() => action.execute({ feedback: value })}
                disabled={value.length === 0 || status === "executing"}
              >
                {status === "executing" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enviar"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
