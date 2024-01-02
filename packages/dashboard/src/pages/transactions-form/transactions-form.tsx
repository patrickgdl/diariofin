import { useNavigate, useParams } from "react-router-dom"
import { Button } from "~/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/ui/dialog"

import TransactionDataForm from "./components/transaction-data-form"
import { Separator } from "~/ui/separator"

export default function TransactionsFormPage() {
  let { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Conta a receber</h3>
        <p className="text-sm text-muted-foreground">Insira aqui uma conta a receber, uma entrada de valor.</p>
      </div>
      <Separator />

      <TransactionDataForm onSubmit={() => null} />

      <Button type="submit">{id === "new" ? "Salvar" : "Atualizar"}</Button>
    </div>
  )
}