import { AppearanceForm } from "~/pages/appearance/components/apperance-form"
import { Button } from "@fluxozen/ui/button"

export function AppearanceMainStep({ onFinalize }: { onFinalize: () => void }) {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Aparência</h1>
          <p className="text-sm text-muted-foreground">
            Personalize a aparência do aplicativo. Alterne entre temas claros e escuros.
          </p>
        </div>

        <AppearanceForm />
      </div>

      <Button className="w-full" variant="outline" onClick={onFinalize}>
        Finalizar
      </Button>
    </div>
  )
}
