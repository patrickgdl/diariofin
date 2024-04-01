import React, { HTMLProps } from "react"

import {
  Column,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { TransactionsByDateQuery } from "~/pages/dashboard/queries/get-transactions-by-date"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "~/ui/table"

export type TransactionsByCategoryGrouped = {
  id: string
  name: string
  color: string
  totalAmount: number
  categories: {
    transaction_categories: {
      id: string
      name: string
      icon: string
      category_groups: {
        id: string
        name: string
        color: string
      } | null
    }
    transactionId: string
    amount: number
    totalAmount?: number
  }[]
}

export function TopCategoriesTableAlt({ data }: { data: TransactionsByDateQuery }) {
  const expenseTransactions = data.filter((transaction) => transaction.amount < 0)
  const total = expenseTransactions.reduce((acc, curr) => acc + Math.abs(curr.amount), 0)

  const groupedData = expenseTransactions.reduce((acc, curr) => {
    if (!curr.transaction_categories?.category_groups) {
      return acc
    }

    const categoryId = curr.transaction_categories.id
    const existingCategory = acc.find((cat) => cat.id === categoryId)

    if (existingCategory) {
      existingCategory.totalAmount += curr.amount
      existingCategory.categories.push({
        transactionId: curr.id,
        transaction_categories: curr.transaction_categories,
        amount: curr.amount,
      })
    } else {
      acc.push({
        id: categoryId,
        name: curr.transaction_categories.name,
        color: curr.transaction_categories.category_groups.color,
        totalAmount: curr.amount,
        categories: [
          {
            transactionId: curr.id,
            transaction_categories: curr.transaction_categories,
            amount: curr.amount,
          },
        ],
      })
    }

    return acc
  }, [] as TransactionsByCategoryGrouped[])

  const columns = React.useMemo<ColumnDef<TransactionsByCategoryGrouped>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: ({ table }) => (
          <>
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />{" "}
            <button
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
            >
              {table.getIsAllRowsExpanded() ? "👇" : "👉"}
            </button>{" "}
            First Name
          </>
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            <div>
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />{" "}
              {row.getCanExpand() ? (
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: "pointer" },
                  }}
                >
                  {row.getIsExpanded() ? "👇" : "👉"}
                </button>
              ) : (
                "🔵"
              )}{" "}
              {getValue<boolean>()}
            </div>
          </div>
        ),
      },
      {
        accessorFn: (row) => row.color,
        id: "color",
        cell: (info) => info.getValue(),
        header: () => <span>Cor</span>,
      },
      {
        accessorKey: "name",
        header: () => "Nome",
      },
      {
        accessorKey: "totalAmount",
        header: () => <span>Total</span>,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
      },
    ],
    []
  )

  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const table = useReactTable({
    data: groupedData,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) =>
      row.categories.map((c) => {
        return {
          id: c.transaction_categories.id,
          name: c.transaction_categories.name,
          color: c.transaction_categories.icon,
          totalAmount: c.totalAmount || 0,
          categories: [],
        }
      }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  return (
    <div className="p-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableCell key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <label>Expanded State:</label>
      <pre>{JSON.stringify(expanded, null, 2)}</pre>
      <label>Row Selection State:</label>
      <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre>
    </div>
  )
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return <input type="checkbox" ref={ref} className={className + " cursor-pointer"} {...rest} />
}
