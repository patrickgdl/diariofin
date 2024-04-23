import { Button } from "@diariofin/ui/button"
import { TableHead, TableHeader, TableRow } from "@diariofin/ui/table"

export function TrackerTableHeader() {
  return (
    <TableHeader>
      <TableRow className="h-[45px]">
        <TableHead className="w-[440px]">
          <Button className="p-0 hover:bg-transparent space-x-2" variant="ghost">
            <span>Projeto</span>
            {/* {"name" === column && value === "asc" && <ArrowDownIcon size={16} />}
            {"name" === column && value === "desc" && <ArrowUpIcon size={16} />} */}
          </Button>
        </TableHead>
        <TableHead className="w-[140px]">
          <Button className="p-0 hover:bg-transparent space-x-2" variant="ghost">
            <span>Total</span>
            {/* {"time" === column && value === "asc" && <ArrowDownIcon size={16} />}
            {"time" === column && value === "desc" && <ArrowUpIcon size={16} />} */}
          </Button>
        </TableHead>
        <TableHead className="w-[430px]">
          <Button className="p-0 hover:bg-transparent space-x-2" variant="ghost">
            <span>Descrição</span>
            {/* {"description" === column && value === "asc" && (
              <ArrowDownIcon size={16} />
            )}
            {"description" === column && value === "desc" && (
              <ArrowUpIcon size={16} />
            )} */}
          </Button>
        </TableHead>
        <TableHead>
          <Button className="p-0 hover:bg-transparent space-x-2" variant="ghost">
            <span>Status</span>
            {/* {"status" === column && value === "asc" && <ArrowDownIcon size={16} />}
            {"status" === column && value === "desc" && <ArrowUpIcon size={16} />} */}
          </Button>
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
