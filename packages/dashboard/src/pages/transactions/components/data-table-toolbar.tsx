import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "~/ui/button"
import { Input } from "~/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog"
import * as React from "react"
import { CalendarDateRangePicker } from "~/components/date-range-picker"

import { DataTableViewOptions } from "./data-table-view-options"

import { priorities, accounts } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const [openTransaction, setOpenTransaction] = React.useState(false)

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar descrição..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("status") && (
          <DataTableFacetedFilter column={table.getColumn("status")} title="Conta" options={accounts} />
        )}

        {table.getColumn("priority") && (
          <DataTableFacetedFilter column={table.getColumn("priority")} title="Priority" options={priorities} />
        )}

        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Limpar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <CalendarDateRangePicker />

        <DataTableViewOptions table={table} />

        <Dialog open={openTransaction} onOpenChange={setOpenTransaction}>
          <DialogTrigger asChild>
            <Button className="ml-2">Novo Contas a Receber</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar fornecedor</DialogTitle>
              <DialogDescription>Adicione um fornecedor para gerenciar.</DialogDescription>
            </DialogHeader>

            <div>TESTE DO TESTE</div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenTransaction(false)}>
                Cancelar
              </Button>

              <Button type="submit" form="account-form">
                Criar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
