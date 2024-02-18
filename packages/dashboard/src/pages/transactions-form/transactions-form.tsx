import { ChevronLeftIcon } from "lucide-react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useNewRecurringPatternMutation } from "~/hooks/useNewRecurringPatternMutation"
import { useNewTransactionInstanceMutation } from "~/hooks/useNewTransactionInstanceMutation"
import { useNewTransactionMutation } from "~/hooks/useNewTransactionMutation"
import useTransactionById from "~/hooks/useTransactionByIdQuery"
import { useUpdateTransactionMutation } from "~/hooks/useUpdateTransactionMutation"
import { Button } from "~/ui/button"
import { Separator } from "~/ui/separator"

import TransactionMainForm from "./components/transaction-main-form"
import { TransactionFormType } from "./schema/transactions-form-schema"
import { cn } from "~/utils/cn"

export default function TransactionsFormPage() {
  let { id } = useParams()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const variant = searchParams.get("type") as "INCOME" | "EXPENSE"

  const isAddMode = id === "new"
  const isExpense = variant === "EXPENSE"
  const { transaction: transactionToUpdate } = useTransactionById(id)

  const newTransaction = useNewTransactionMutation()
  const updateTransaction = useUpdateTransactionMutation()
  const newRecurringPattern = useNewRecurringPatternMutation()
  const newTransactionInstance = useNewTransactionInstanceMutation()

  async function handleSubmit(values: TransactionFormType) {
    console.log({ values })
    const { recurring_type_id, max_num_of_ocurrences, is_done, ...transaction } = values

    if (isAddMode) {
      const response = await newTransaction.mutateAsync({
        ...transaction,
        amount: isExpense ? -transaction.amount : transaction.amount,
        client_id: transaction.client_id ? transaction.client_id : null,
        start_date: transaction.start_date.toISOString(),
        parent_transaction_id: null,
      })

      if (is_done && response) {
        await newTransactionInstance.mutateAsync({
          is_done: true,
          is_canceled: false,
          is_rescheduled: false,
          transaction_id: response[0].id,
          start_date: transaction.start_date.toISOString(),
          end_date: null,
        })
      }

      if (transaction.is_recurring && recurring_type_id && response) {
        await newRecurringPattern.mutateAsync({
          recurring_type_id: parseInt(recurring_type_id, 10),
          max_num_of_ocurrences: max_num_of_ocurrences ? parseInt(max_num_of_ocurrences, 10) : null,
          transaction_id: response[0].id,
        })
      }
    } else {
      await updateTransaction.mutateAsync({
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
          <h3 className={cn("text-lg font-medium", isExpense ? "text-red-500" : "text-emerald-500")}>
            Conta a {variant === "EXPENSE" ? "pagar" : "receber"}
          </h3>
          <p className="text-sm text-muted-foreground">Insira aqui uma transação.</p>
        </div>
      </div>
      <Separator />

      <div className="flex flex-col mx-auto max-w-2xl">
        <TransactionMainForm
          variant={variant}
          transactionToUpdate={transactionToUpdate}
          onSubmit={(values) => handleSubmit(values)}
        />

        <div className="space-x-2 flex items-center justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button type="submit" form="transaction-form" className={isExpense ? "bg-red-500" : "bg-emerald-500"}>
            {isAddMode ? "Salvar" : "Atualizar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
