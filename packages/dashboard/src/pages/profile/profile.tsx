import { Separator } from "~/ui/separator"

import { ProfileForm } from "./components/profile-form"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">Essa suas informações pessoais feitas no cadastro.</p>
      </div>

      <Separator />

      {/* <ProfileForm /> */}

      <h3 className="text-lg font-medium">Em breve</h3>
    </div>
  )
}
