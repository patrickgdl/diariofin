import { cn } from "../ui/utils";

export function BlurryCircle({ className }) {
  return (
    <div
      className={cn("w-[216px] h-[216px] rounded-full blur-2xl", className)}
    />
  );
}
