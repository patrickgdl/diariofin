import { Input } from "@diariofin/ui/input"
import { SearchIcon } from "lucide-react"

type SearchFieldProps = {
  placeholder?: string
  value?: string
  onChange: (value: string | null) => void
}

export function SearchField({ placeholder, value, onChange }: SearchFieldProps) {
  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value

    if (value) {
      onChange(value)
    } else {
      onChange(null)
    }
  }

  return (
    <div className="max-w-[350px] relative w-full">
      <SearchIcon className="absolute pointer-events-none left-3 top-[10px] w-4 h-4" />
      <Input
        placeholder={placeholder}
        className="pl-9 w-full"
        defaultValue={value}
        onChange={handleSearch}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  )
}
