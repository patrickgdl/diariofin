import { Table, TableBody } from "@diariofin/ui/table"
import { TrackerTableRow } from "./tracker-table-row"
import { TrackerTableHeader } from "./tracker-table-header"

type ItemsProps = {
  onRowClick: (rowId: string) => void
}

export function TrackerTable({ onRowClick }: ItemsProps) {
  const data = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
  ]

  return (
    <Table>
      <TrackerTableHeader />

      <TableBody>
        {data.map((row) => (
          <TrackerTableRow row={row} onRowClick={onRowClick} key={row.id} />
        ))}
      </TableBody>
    </Table>
  )
}
