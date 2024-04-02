import { useTheme } from "next-themes"
import { SVGAttributes } from "react"

const LogoMark = ({ className, ...rest }: SVGAttributes<SVGElement>) => {
  const { theme, resolvedTheme } = useTheme()
  const isDark = theme === "dark" || resolvedTheme === "dark"

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.98998 5.98976H14V-1.26348e-06H0V14C0 21.7318 6.26816 27.9998 14 28C21.7318 27.9998 28 21.7318 28 14C28 6.9542 22.7948 1.12503 16.0205 0.145584V6.24666C19.467 7.14166 22.0102 10.2722 22.0102 14C22.0102 18.4257 18.4257 22.01 14 22.0102C9.57426 22.0102 5.98998 18.4257 5.98998 14H14V10.9963V8.01024H5.98998V5.98976Z"
        fill={isDark ? "white" : "#121212"}
      />
    </svg>
  )
}

export default LogoMark
