import { ChevronLeftIcon } from "lucide-react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useAuthUser } from "~/contexts/SessionContext"
import { useNewRecurringPatternMutation } from "~/hooks/useNewRecurringPatternMutation"
import { useNewTransactionInstanceMutation } from "~/hooks/useNewTransactionInstanceMutation"
import { useNewTransactionMutation } from "~/hooks/useNewTransactionMutation"
import useTransactionById from "~/hooks/useTransactionByIdQuery"
import { useUpdateTransactionMutation } from "~/hooks/useUpdateTransactionMutation"
import { Button } from "@diariofin/ui/button"
import { Separator } from "@diariofin/ui/separator"
import { toast } from "@diariofin/ui/use-toast"
import { cn } from "@diariofin/ui/utils"

import { TransactionExpenseFormType } from "./components/expense/transactions-expense-form-schema"
import { TransactionIncomeFormType } from "./components/income/transaction-income-form-schema"
import TransactionExpenseForm from "./components/expense/transaction-expense-form"
import TransactionIncomeForm from "./components/income/transaction-income-form"

export default function TransactionsFormPage() {
  const navigate = useNavigate()
  const { id: user_id } = useAuthUser() || {}

  let { id } = useParams()
  const isAddMode = id === "new"

  const [searchParams] = useSearchParams()
  const variant = searchParams.get("type") as "INCOME" | "EXPENSE"

  const isExpense = variant === "EXPENSE"
  const { transaction: transactionToUpdate } = useTransactionById(id)

  const newTransaction = useNewTransactionMutation()
  const updateTransaction = useUpdateTransactionMutation()
  const newRecurringPattern = useNewRecurringPatternMutation()
  const newTransactionInstance = useNewTransactionInstanceMutation()

  async function handleSubmit(values: TransactionExpenseFormType | TransactionIncomeFormType) {
    const { recurring_type_id, max_num_of_ocurrences, is_done, ...transaction } = values

    if (!user_id) return

    try {
      if (isAddMode) {
        const response = await newTransaction.mutateAsync({
          ...transaction,
          user_id,
          amount: isExpense ? -transaction.amount : transaction.amount,
          notes: transaction.notes ? transaction.notes : null,
          client_id: transaction.client_id ? transaction.client_id : null,
          category_id: transaction.category_id ? transaction.category_id : null,
          date: transaction.date.toISOString(),
          parent_transaction_id: null,
        })

        if (response) {
          const transactionId = response[0].id
          await newTransactionInstance.mutateAsync({
            user_id,
            is_done: is_done,
            is_cancelled: false,
            is_refunded: false,
            transaction_id: transactionId,
          })

          if (transaction.is_recurring && recurring_type_id) {
            await newRecurringPattern.mutateAsync({
              recurring_type_id: parseInt(recurring_type_id, 10),
              max_num_of_ocurrences: max_num_of_ocurrences ? parseInt(max_num_of_ocurrences, 10) : null,
              transaction_id: transactionId,
            })
          }
        }
      } else {
        await updateTransaction.mutateAsync({
          id: id!,
          transaction: {
            ...transaction,
            client_id: transaction.client_id ? transaction.client_id : null,
            date: transaction.date.toISOString(),
          },
        })
      }

      toast({ title: `${isExpense ? "Pagamento" : "Recebimento"} criado/atualizado com sucesso` })
      navigate("/transactions")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex space-x-2 items-center p-4 md:p-6">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <div>
            <h3 className={cn("text-lg font-medium", isExpense ? "text-red-500" : "text-emerald-500")}>
              Conta a {isExpense ? "pagar" : "receber"}
            </h3>
            <p className="text-sm text-muted-foreground">Insira aqui sua transação.</p>
          </div>
        </div>
        <Separator />
      </div>

      <div className="flex flex-col p-4 md:p-0 mx-auto max-w-xl">
        {isExpense ? (
          <TransactionExpenseForm
            transactionToUpdate={transactionToUpdate}
            onSubmit={(values) => handleSubmit(values)}
          />
        ) : (
          <TransactionIncomeForm
            transactionToUpdate={transactionToUpdate}
            onSubmit={(values) => handleSubmit(values)}
          />
        )}
        <div className="space-x-2 flex w-full items-center justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button type="submit" form="transaction-form">
            {isAddMode ? "Salvar" : "Atualizar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
