import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { MouseEventHandler } from "react"
import { CalendarDateRangePicker } from "~/components/date-range-picker"
import useAppContext from "~/hooks/useAppContext"
import { Button } from "~/ui/button"
import { Input } from "~/ui/input"

import { DataTableFacetedFilter } from "./transactions-faceted-filter"
import { DataTableViewOptions } from "./transactions-view-options"
import useCategories from "~/hooks/useCategoriesQuery"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  onNewClick: MouseEventHandler<HTMLButtonElement> | undefined
}

export function DataTableToolbar<TData>({ table, onNewClick }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const { categories } = useCategories()

  const { accounts } = useAppContext()

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar descrição..."
          value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("description")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("account") && (
          <DataTableFacetedFilter
            column={table.getColumn("account")}
            title="Conta"
            options={accounts.map((account) => ({ id: account.id, name: account.name }))}
          />
        )}

        {table.getColumn("transaction_categories") && (
          <DataTableFacetedFilter
            column={table.getColumn("transaction_categories")}
            title="Categoria"
            options={categories}
          />
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

        <Button className="ml-2" onClick={onNewClick}>
          Novo
        </Button>
      </div>
    </div>
  )
}
