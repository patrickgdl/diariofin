import { Badge } from "@diariofin/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@diariofin/ui/collapsible"
import { Progress } from "@diariofin/ui/progress"
import { TableCell, TableRow } from "@diariofin/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@diariofin/ui/tooltip"
import { ChevronRightIcon } from "lucide-react"
import * as React from "react"
import formatCurrency from "~/utils/format-currency"
import { formatPercentage } from "~/utils/format-percentage"
import { hexToRgb } from "~/utils/hexToRgb"

import { CategoriesRowExpanded } from "./categories-row-expanded"
import { TransactionGroupedByCategory } from "./categories-table"

type CategoryRowProps = {
  total: number
  row: TransactionGroupedByCategory
  defaultOpen?: boolean
  onSelect: (category: TransactionGroupedByCategory["categories"][0]) => void
}

export function CategoryRow({ row, total, onSelect, defaultOpen }: CategoryRowProps) {
  return (
    <Collapsible defaultOpen={defaultOpen} asChild>
      {/* this fragment is necessary to avoid a needless div wrapper around the row */}
      <React.Fragment>
        <CollapsibleTrigger asChild>
          <TableRow className="group">
            <TableCell className="w-[5%]">
              <ChevronRightIcon className="group-data-[state=open]:rotate-90 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </TableCell>
            <TableCell className="w-[5%]">
              <Badge className="px-1.5" style={{ backgroundColor: hexToRgb(row.color || "#3b82f6", "0.2") }}>
                <span className="font-medium" style={{ color: row.color || "#3b82f6" }}>
                  {row.categories.length}
                </span>
              </Badge>
            </TableCell>

            <TableCell className="w-1/2">{row.name}</TableCell>

            <TableCell className="w-1/5">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Progress value={Math.abs(row.totalAmount / total) * 100} className="w-full" />
                </TooltipTrigger>
                <TooltipContent>
                  Essa categoria equivale a {formatPercentage(Math.abs(row.totalAmount / total) * 100)} das suas
                  despesas totais.
                </TooltipContent>
              </Tooltip>
            </TableCell>

            <TableCell className="w-1/3 text-right">{formatCurrency(row.totalAmount)}</TableCell>
          </TableRow>
        </CollapsibleTrigger>

        <CollapsibleContent asChild>
          <CategoriesRowExpanded categories={row.categories} onSelect={onSelect} />
        </CollapsibleContent>
      </React.Fragment>
    </Collapsible>
  )
}
