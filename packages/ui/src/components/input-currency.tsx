import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";
import { cn } from "../utils";

import { inputStyles } from "./input";

type CustomProps = {
  /**
   * Handle change from onValueChange but just the float type option
   */
  onCustomChange: (value: number | null) => void;
};

const InputCurrency = ({
  className,
  onCustomChange,
  ...props
}: CurrencyInputProps & CustomProps) => {
  return (
    <CurrencyInput
      prefix="R$ "
      decimalsLimit={2}
      groupSeparator="."
      decimalSeparator=","
      placeholder="R$ 00,00"
      className={cn(inputStyles(), className)}
      onValueChange={(_, __, values) => onCustomChange(values?.float || null)}
      {...props}
    />
  );
};

InputCurrency.displayName = "InputCurrency";

export { InputCurrency };
