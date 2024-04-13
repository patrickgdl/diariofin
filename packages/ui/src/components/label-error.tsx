import { cva } from "class-variance-authority";
import { cn } from "../utils";

const errorVariants = cva("text-red-500 text-xs");

export const LabelError = ({ className, children, ...props }: any) => (
  <small className={cn(errorVariants(), className)} {...props}>
    {children}
  </small>
);
