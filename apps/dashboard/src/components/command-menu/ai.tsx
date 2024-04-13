import { BackButton } from "~/components/command-menu/back-button"
import { MenuOption, useCommandStore } from "~/store/command"
import { Button } from "@fluxozen/ui/button"

export function CommandAI() {
  const { setMenu } = useCommandStore()

  return (
    <div className="h-[500px]">
      <div className="p-5 flex items-center space-x-3">
        <BackButton />
        <h2>FluxoZen AI</h2>
      </div>

      <div className="mt-24 flex items-center justify-center text-sm flex-col space-y-4">
        <p>Não habilitado para essa conta.</p>
        <Button variant="outline" onClick={() => setMenu(MenuOption.Feedback)}>
          Requisite acesso
        </Button>
      </div>
    </div>
  )
}
