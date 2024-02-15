import { ChevronLeftIcon } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import supabase from "~/services/supabase"
import { Button } from "~/ui/button"
import { Separator } from "~/ui/separator"
import { useToast } from "~/ui/use-toast"

import TransactionMainForm from "./components/transaction-main-form"
import { TransactionFormType } from "./schema/transactions-form-schema"

export default function TransactionsFormPage() {
  let { id } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()

  async function handleSubmit(values: TransactionFormType) {
    const { recurrence, is_done, ...transaction } = values

    const { data, error } = await supabase
      .from("transactions")
      .insert({ ...transaction, start_date: transaction.start_date.toISOString() })
      .select()

    if (error) return toast({ variant: "destructive", description: "Ocorreu um erro." })

    if (data) {
      toast({ description: "Salvo com sucesso" })
    }

    if (is_done) {
      const instanceWithTransactionId = {
        is_done: true,
        is_canceled: false,
        is_rescheduled: false,
        transaction_id: data[0].id,
        start_date: transaction.start_date.toISOString(),
        end_date: null,
      }

      const { error } = await supabase
        .from("transactions_instance")
        .insert({ ...instanceWithTransactionId })
        .select()

      if (error) return toast({ variant: "destructive", description: "Ocorreu um erro ao salvar a instância." })
    }

    if (recurrence) {
      const recurrenceWithTransactionId = {
        ...recurrence,
        recurring_type_id: parseInt(recurrence.recurring_type_id, 10),
        max_num_of_ocurrences: parseInt(recurrence.max_num_of_ocurrences, 10),
        transaction_id: data[0].id,
      }

      const { error } = await supabase
        .from("recurring_pattern")
        .insert({ ...recurrenceWithTransactionId })
        .select()

      if (error) return toast({ variant: "destructive", description: "Ocorreu um erro ao salvar a recorrência." })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 items-center">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        <div>
          <h3 className="text-lg font-medium text-emerald-500">Conta a receber</h3>
          <p className="text-sm text-muted-foreground">Insira aqui uma conta a receber/entrada de valor.</p>
        </div>
      </div>
      <Separator />

      <div className="flex flex-col mx-auto max-w-2xl">
        <TransactionMainForm variant="INCOME" onSubmit={console.log} />

        <div className="space-x-2 flex items-center justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button type="submit" className="bg-emerald-500" form="transaction-form">
            {id === "new" ? "Salvar" : "Atualizar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
