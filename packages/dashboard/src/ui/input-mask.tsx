import ReactInputMask, { Props as InputMaskProps } from "react-input-mask"
import { cn } from "~/utils/cn"

import { inputStyles } from "./input"

const InputMask = ({ className, ...props }: InputMaskProps) => {
  return <ReactInputMask className={cn(inputStyles(), className)} {...props} />
}

export { InputMask }
