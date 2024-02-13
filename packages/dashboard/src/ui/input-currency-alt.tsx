import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field"
import { cn } from "~/utils/cn"

type CustomProps = {
  /**
   * Handle change from onValueChange but just the float type option
   */
  onCustomChange: (value: number | null) => void
}

const InputCurrency = ({ className, onCustomChange, ...props }: CurrencyInputProps & CustomProps) => {
  return (
    <CurrencyInput
      prefix="R$ "
      decimalsLimit={2}
      groupSeparator="."
      decimalSeparator=","
      placeholder="R$ 00,00"
      className={cn(
        "flex h-9 rounded-md bg-background font-semibold px-3 py-1 text-2xl transition-colors placeholder:text-gray-300 placeholder:font-semibold focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onValueChange={(_, __, values) => onCustomChange(values?.float || null)}
      {...props}
    />
  )
}

InputCurrency.displayName = "InputCurrency"

export { InputCurrency }
