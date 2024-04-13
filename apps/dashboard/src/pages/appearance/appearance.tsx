import { SelectSeparator } from "@fluxozen/ui/select"

import { AppearanceForm } from "./components/apperance-form"

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Aparência</h3>
        <p className="text-sm text-muted-foreground">
          Personalize a aparência do aplicativo. Alterne automaticamente entre temas claros e escuros.
        </p>
      </div>

      <SelectSeparator />

      <AppearanceForm />
    </div>
  )
}
