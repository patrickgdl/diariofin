import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useNewTransactionMutation } from "~/hooks/useNewTransactionMutation"
import { TransactionsQuery } from "~/queries/get-transactions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@fluxozen/ui/alert-dialog"
import { Button } from "@fluxozen/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@fluxozen/ui/dropdown-menu"
import { toast } from "@fluxozen/ui/use-toast"

import { REFUND_CATEGORY_ID, TRANSACTION_TYPE } from "../constants"
import { useNewTransactionInstanceMutation } from "~/hooks/useNewTransactionInstanceMutation"
import { useUpdateTransactionInstanceMutation } from "~/hooks/useUpdateTransactionInstanceMutation"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps<TransactionsQuery[0]>) {
  const navigate = useNavigate()
  const newTransaction = useNewTransactionMutation()
  const newTransactionInstance = useNewTransactionInstanceMutation()
  const updateTransactionInstance = useUpdateTransactionInstanceMutation()

  const [open, setOpen] = React.useState(false)

  const confirmRefundTransaction = async () => {
    const originalTransaction = row.original
    const isExpense = originalTransaction.transaction_types?.id === TRANSACTION_TYPE.EXPENSE

    const response = await newTransaction.mutateAsync({
      amount: isExpense ? Math.abs(originalTransaction.amount) : -originalTransaction.amount,
      description: `Estorno de ${originalTransaction.description}`,
      notes: originalTransaction?.notes ?? null,
      account_id: originalTransaction.account?.id!,
      category_id: REFUND_CATEGORY_ID,
      type_id: isExpense ? TRANSACTION_TYPE.INCOME : TRANSACTION_TYPE.EXPENSE,
      client_id: originalTransaction.clients?.id ?? null,
      date: originalTransaction.date,
      parent_transaction_id: originalTransaction.id,
      is_recurring: originalTransaction.is_recurring,
      user_id: originalTransaction.user_id,
    })

    if (response) {
      await newTransactionInstance.mutateAsync({
        user_id: originalTransaction.user_id,
        is_done: true,
        is_cancelled: false,
        is_refunded: true,
        transaction_id: response[0].id,
      })

      await updateTransactionInstance.mutateAsync({
        id: originalTransaction.id,
        instance: {
          is_done: true,
          is_cancelled: true,
          is_refunded: true,
        },
      })
    }

    toast({ title: "Estorno efetuado com sucesso!" })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => navigate(`/transactions/${row.original.id}`)}>Editar</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>Estornar/Reverter</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso vai reverter permanentemente sua transação e criar uma transação
              inversa de estorno.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRefundTransaction}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
