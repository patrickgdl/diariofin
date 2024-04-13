import { cn } from "@fluxozen/ui/utils";
import Image from "next/image";
import type ImageProps from "next/image";

type Props = {
  lightSrc: string;
  darkSrc: string;
  className: string;
  alt: string;
} & typeof ImageProps;

export function AdaptiveImage({
  lightSrc,
  darkSrc,
  className,
  alt,
  ...rest
}: Props) {
  return (
    <>
      <Image
        src={darkSrc}
        alt={alt}
        className={cn("hidden dark:block", className)}
        {...rest}
      />

      <Image
        src={lightSrc}
        alt={alt}
        className={cn("block dark:hidden", className)}
        {...rest}
      />
    </>
  );
}
