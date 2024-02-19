import { Loader2 } from "lucide-react"

function Loader() {
  return (
    <div className="h-screen">
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  )
}

export default Loader
