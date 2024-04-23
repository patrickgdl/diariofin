import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@diariofin/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@diariofin/ui/dropdown-menu"
import { TableCell, TableRow } from "@diariofin/ui/table"
import { cn } from "@diariofin/ui/utils"
import { MoreHorizontalIcon } from "lucide-react"
import { secondsToHoursAndMinutes } from "~/utils/format-date"

type TrackerTableRowProps = {
  row: any
  onRowClick: (params: any) => void
}

export function TrackerTableRow({ row, onRowClick }: TrackerTableRowProps) {
  return (
    <AlertDialog>
      <DropdownMenu>
        <TableRow className="h-[45px]" onClick={() => onRowClick({ projectId: row.id })}>
          <TableCell>{row.name}</TableCell>
          <TableCell>
            <span className="text-sm">{secondsToHoursAndMinutes(row?.total_duration)}</span>
          </TableCell>
          <TableCell>{row.description}</TableCell>

          <TableCell>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div
                  className={cn("w-[6px] h-[6px] rounded-full bg-[#FFD02B]", status === "completed" && "bg-primary")}
                />
                <span>{row.status}</span>
              </div>

              <DropdownMenuTrigger>
                <MoreHorizontalIcon className="h-5 w-5" />
              </DropdownMenuTrigger>
            </div>
          </TableCell>
        </TableRow>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem absoluta certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Todos os dados serão perdidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => alert("Continuar ainda não implementado")}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
        <DropdownMenuContent className="w-42" sideOffset={10} align="end">
          <DropdownMenuItem onClick={() => alert("Editar ainda não implementado")}>Editar</DropdownMenuItem>
          {row.status !== "completed" && (
            <DropdownMenuItem onClick={() => alert("Marcar como feito ainda não implementado")}>
              Marcar como feito
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => alert("Criar relatório ainda não implementado")}>
            Compartilhar
          </DropdownMenuItem>

          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-destructive">Deletar</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </AlertDialog>
  )
}
