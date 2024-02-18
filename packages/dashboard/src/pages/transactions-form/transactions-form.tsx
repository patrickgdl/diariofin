import { ChevronLeftIcon } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useNewRecurringPatternMutation } from "~/hooks/useNewRecurringPatternMutation"
import { useNewTransactionInstanceMutation } from "~/hooks/useNewTransactionInstanceMutation"
import { useNewTransactionMutation } from "~/hooks/useNewTransactionMutation"
import useTransactionById from "~/hooks/useTransactionByIdQuery"
import { useUpdateTransactionMutation } from "~/hooks/useUpdateTransactionMutation"
import { Button } from "~/ui/button"
import { Separator } from "~/ui/separator"

import TransactionMainForm from "./components/transaction-main-form"
import { TransactionFormType } from "./schema/transactions-form-schema"

export default function TransactionsFormPage() {
  let { id } = useParams()
  const navigate = useNavigate()

  const isAddMode = id === "new"

  const { transaction: transactionToUpdate } = useTransactionById(id)

  const transactionMutation = useNewTransactionMutation()
  const recurringPatternMutation = useNewRecurringPatternMutation()
  const transactionInstanceMutation = useNewTransactionInstanceMutation()

  const updateTransactionMutation = useUpdateTransactionMutation()

  async function handleSubmit(values: TransactionFormType) {
    const { recurring_type_id, max_num_of_ocurrences, is_done, ...transaction } = values

    if (isAddMode) {
      const response = await transactionMutation.mutateAsync({
        ...transaction,
        client_id: transaction.client_id ? transaction.client_id : null,
        start_date: transaction.start_date.toISOString(),
        parent_transaction_id: null,
      })

      if (is_done && response) {
        await transactionInstanceMutation.mutateAsync({
          is_done: true,
          is_canceled: false,
          is_rescheduled: false,
          transaction_id: response[0].id,
          start_date: transaction.start_date.toISOString(),
          end_date: null,
        })
      }

      if (transaction.is_recurring && recurring_type_id && response) {
        await recurringPatternMutation.mutateAsync({
          recurring_type_id: parseInt(recurring_type_id, 10),
          max_num_of_ocurrences: max_num_of_ocurrences ? parseInt(max_num_of_ocurrences, 10) : null,
          transaction_id: response[0].id,
        })
      }
    } else {
      await updateTransactionMutation.mutateAsync({
        id: id!,
        transaction: {
          ...transaction,
          client_id: transaction.client_id ? transaction.client_id : null,
          start_date: transaction.start_date.toISOString(),
        },
      })
    }

    navigate("/transactions")
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
        <TransactionMainForm
          variant="INCOME"
          transactionToUpdate={transactionToUpdate}
          onSubmit={(values) => handleSubmit(values)}
        />

        <div className="space-x-2 flex items-center justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button type="submit" className="bg-emerald-500" form="transaction-form">
            {isAddMode ? "Salvar" : "Atualizar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
