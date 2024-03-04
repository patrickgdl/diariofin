import { ChevronLeftIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "~/ui/button"
import { Separator } from "~/ui/separator"

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div>
        <div className="flex space-x-2 items-center p-6">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <div>
            <h3 className="text-lg font-medium">Nova conta</h3>
            <p className="text-sm text-muted-foreground">Insira aqui uma nova conta.</p>
          </div>
        </div>
        <Separator />
      </div>

      <div className="flex flex-col mx-auto max-w-2xl">{children}</div>
    </div>
  )
}

export default AccountLayout
