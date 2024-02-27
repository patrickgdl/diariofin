import { useState } from "react"
import useAppContext from "~/hooks/useAppContext"
import { useUpdateAccountMutation } from "~/hooks/useUpdateAccountMutation"
import { Account } from "~/types/account"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/ui/alert-dialog"
import { Button } from "~/ui/button"
import { ButtonLoading } from "~/ui/button-loading"

import { AccountsDashboard } from "./components/accounts-layout"

export default function AccountsPage() {
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
      <AccountsDashboard accounts={accounts} onDeactivate={setAccountToDeactivate} />

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
