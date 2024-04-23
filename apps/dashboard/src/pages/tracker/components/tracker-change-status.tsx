import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@fluxozen/ui/select"
import { useSearchParams } from "react-router-dom"

export function TrackerChangeStatus() {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries([...searchParams])

  const handleChangeStatus = (value: string) => {
    if (value === "all") {
      searchParams.delete("status")
      setSearchParams(searchParams)
    } else {
      setSearchParams({ status: value })
    }
  }

  return (
    <Select onValueChange={handleChangeStatus} value={params.status}>
      <SelectTrigger className="min-w-[120px]">
        <SelectValue placeholder="Todos" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        <SelectItem value="in_progress">Em progresso</SelectItem>
        <SelectItem value="completed">Feito</SelectItem>
      </SelectContent>
    </Select>
  )
}
