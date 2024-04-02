import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { CalendarDateRangePicker } from "~/components/date-range-picker"
import useAppContext from "~/hooks/useAppContext"
import useCategories from "~/hooks/useCategoriesQuery"
import { Button } from "~/ui/button"
import { Input } from "~/ui/input"

import { DataTableFacetedFilter } from "./transactions-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const { accounts } = useAppContext()
  const { categories } = useCategories()

  return (
    <div className="flex flex-col gap-2">
      <CalendarDateRangePicker onSelectDate={() => alert("Ainda não implementado")} />

      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar descrição..."
          value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("description")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[260px]"
        />

        {table.getColumn("is_done") && (
          <DataTableFacetedFilter
            column={table.getColumn("is_done")}
            title="Status"
            options={[
              { id: "true", name: "Confirmado" },
              { id: "false", name: "Pendente" },
            ]}
          />
        )}

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
    </div>
  )
}
