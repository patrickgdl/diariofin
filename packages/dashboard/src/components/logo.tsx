import { PiggyBank } from "lucide-react"
import { SVGAttributes } from "react"

const Logo = ({ className, ...rest }: SVGAttributes<SVGElement>) => {
  return <PiggyBank className={className} {...rest} />
}

export default Logo
