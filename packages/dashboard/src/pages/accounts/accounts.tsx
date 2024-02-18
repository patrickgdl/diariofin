import useAppContext from "~/hooks/useAppContext"
import { Separator } from "~/ui/separator"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/ui/alert-dialog"

import { AccountsTable } from "./components/accounts-table"
import { Button } from "~/ui/button"
import { useState } from "react"
import { useUpdateAccountMutation } from "~/hooks/useUpdateAccountMutation"
import { Account } from "~/types/account"
import { ButtonLoading } from "~/ui/button-loading"

export default function SettingsAccountPage() {
  const { accounts } = useAppContext()
  const [accountToDeactivate, setAccountToDeactivate] = useState<Account | null>()

  const updateAccount = useUpdateAccountMutation()

  const handleDeactivateAccount = () => {
    if (accountToDeactivate) {
      const params = {
        id: accountToDeactivate.id,
        account: {
          active: false,
        },
      }

      updateAccount.mutate(params, {
        onSuccess: () => {
          setAccountToDeactivate(null)
        },
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Contas</h3>
        <p className="text-sm text-muted-foreground">Atualize suas contas, edite ou exclua.</p>
      </div>

      <Separator />

      <AccountsTable accounts={accounts} onDeactivate={setAccountToDeactivate} />

      <AlertDialog open={!!accountToDeactivate} onOpenChange={() => setAccountToDeactivate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Desativar uma conta implica em alterações em todo seu dashboard
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            {updateAccount.isPending ? (
              <ButtonLoading label="Desativando conta..." />
            ) : (
              <Button variant="destructive" onClick={handleDeactivateAccount}>
                Desativar
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
