import { useUser } from "~/contexts/UserContext"
import { useUpdateUserMutation } from "~/hooks/useUpdateUserMutation"

import { ProfileForm, ProfileFormValues } from "./components/profile-form"
import { Separator } from "@diariofin/ui/separator"
import { toast } from "@diariofin/ui/use-toast"

export default function SettingsProfilePage() {
  const { user } = useUser()
  const updateUser = useUpdateUserMutation()

  if (!user) return null

  function handleSubmit(data: ProfileFormValues) {
    if (user?.id) {
      updateUser.mutate({ id: user.id, user: data })

      toast({ title: "Perfil atualizado com sucesso" })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">Essa suas informações pessoais feitas no cadastro.</p>
      </div>

      <Separator />

      <ProfileForm defaultValues={{ name: user.name || "" }} onSubmit={handleSubmit} />
    </div>
  )
}
