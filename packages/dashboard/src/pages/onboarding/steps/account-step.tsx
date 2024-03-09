import { zodResolver } from "@hookform/resolvers/zod"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { PlusIcon } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"
import { useAuthUser } from "~/contexts/SessionContext"
import { Account } from "~/types/account"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Button } from "~/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/ui/dropdown-menu"
import formatCurrency from "~/utils/format-currency"
import { getAcronym } from "~/utils/get-acronym"

import accountFormSchema, { AccountFormType } from "../components/account-form-schema"
import AccountForm from "../components/account-simple-form"
import { useStepper } from "~/ui/stepper"
import { toast } from "~/ui/use-toast"

export type AccountWithoutId = Omit<Account, "id">

type AccountStepProps = {
  accounts: AccountWithoutId[]
  onAddAccount: (account: AccountWithoutId) => void
  onRemoveAccount: (account: AccountWithoutId) => void
}

export function AccountMainStep({ accounts, onAddAccount, onRemoveAccount }: AccountStepProps) {
  const { nextStep } = useStepper()
  const { id: user_id } = useAuthUser() || {}

  const [open, setOpen] = React.useState(false)

  const form = useForm<AccountFormType>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      account_number: "",
      agency: "",
      name: "",
      pix: "",
      pix_type: "",
    },
  })

  const handleSubmit = async (values: AccountFormType) => {
    if (!user_id) return

    setOpen(false)
    form.reset()

    onAddAccount({ ...values, active: true, user_id })
  }

  const handleRemoveAccount = async (account: AccountWithoutId) => {
    onRemoveAccount(account)
  }

  const handleNextStep = () => {
    if (accounts.length < 1) {
      toast({
        title: "Para começar precisamos de pelo menos uma conta bancária, mesmo que seja com valor zerado.",
        description: `Clique em "Adicionar Conta" e comece agora mesmo`,
        variant: "default",
      })
      return
    }

    nextStep()
  }

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Crie suas contas bancárias</h1>
          <p className="text-sm text-muted-foreground">
            Coloque os dados das suas contas bancárias para acompanhar suas evoluções.
          </p>
          <p className="text-sm text-muted-foreground">Não vendemos ou compartilhamos seus dados</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <PlusIcon className="h-4 w-4 mr-2" /> Adicionar Conta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="mx-auto w-full max-w-sm space-y-6">
              <DialogHeader>
                <DialogTitle className="text-sm">Nova Conta</DialogTitle>
              </DialogHeader>

              <AccountForm onSubmit={handleSubmit} form={form} />

              <Button className="w-full" type="submit" form="account-form">
                Salvar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {accounts?.length > 0 &&
          accounts.map((account) => (
            <div className="flex items-center" key={account.name}>
              <Avatar className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${account.name}.svg?text=${getAcronym(account.name)}`}
                  alt={account.name}
                />
                <AvatarFallback>{getAcronym(account.name)}</AvatarFallback>
              </Avatar>

              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{account.name}</p>
                <p className="text-sm text-muted-foreground">{account.pix}</p>
              </div>

              <div className="ml-auto font-medium">{formatCurrency(account.balance)}</div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2 h-8 w-8">
                    <span className="sr-only">Abrir opções</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleRemoveAccount(account)}>Excluir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
      </div>

      <Button className="w-full" variant="outline" onClick={handleNextStep}>
        Continuar
      </Button>
    </div>
  )
}

type AccountSecondaryStepProps = {
  accounts: AccountWithoutId[]
}

export function AccountSecondaryStep({ accounts }: AccountSecondaryStepProps) {
  const totalAmount = accounts?.reduce((acc, account) => acc + account.balance, 0)

  return (
    <div className="flex flex-col space-y-5 px-4">
      <h1 className="text-2xl tracking-tight">Patrimônio Líquido</h1>
      <p className="text-3xl font-semibold">{formatCurrency(totalAmount || 0)}</p>
    </div>
  )
}
