import { useNavigate, useParams } from "react-router-dom"
import { Button } from "~/ui/button"

import TransactionMainForm from "./components/transaction-main-form"
import { Separator } from "~/ui/separator"

export default function TransactionsFormPage() {
  let { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-emerald-500">Conta a receber</h3>
        <p className="text-sm text-muted-foreground">Insira aqui uma conta a receber/entrada de valor.</p>
      </div>
      <Separator />

      <div className="flex flex-col mx-auto max-w-2xl">
        <TransactionMainForm variant="INCOME" onSubmit={console.log} />

        <div className="space-x-2 flex items-center justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button type="submit" form="transaction-form">
            {id === "new" ? "Salvar" : "Atualizar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
