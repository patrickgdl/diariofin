import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Button } from "~/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"
import { cn } from "~/utils/cn"
import { useForm, SubmitHandler } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "~/ui/input"
import { Label } from "~/ui/label"

const groups = [
  {
    label: "Conta pessoal",
    accounts: [
      {
        label: "Patrick Lima",
        value: "personal",
      },
    ],
  },
  {
    label: "Contas Bancárias",
    accounts: [
      {
        label: "Banco BTG",
        value: "btg-bank",
      },
      {
        label: "C6 Bank",
        value: "c6-bank",
      },
    ],
  },
]

type Account = (typeof groups)[number]["accounts"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface AccountSwitcherProps extends PopoverTriggerProps {}

const formSchema = z.object({
  account_number: z
    .string()
    .max(10, {
      message: "Número da Conta deve conter no máximo 10 caracteres",
    })
    .optional(),
  agency: z
    .string()
    .max(10, {
      message: "Agência deve conter no máximo 10 caracteres",
    })
    .optional(),
  balance: z.coerce.number().optional(),
  name: z
    .string()
    .min(2, {
      message: "Nome precisa ser no mínimo 2 caracteres",
    })
    .max(50),
  pix: z.string().optional(),
  pix_type: z.string().optional(),
})

export default function AccountSwitcher({ className }: AccountSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewAccountDialog, setShowNewAccountDialog] = React.useState(false)
  const [selectedAccount, setSelectedAccount] = React.useState<Account>(groups[0].accounts[0])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Dialog open={showNewAccountDialog} onOpenChange={setShowNewAccountDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Selecione uma conta"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={`https://avatar.vercel.sh/${selectedAccount.value}.png`} alt={selectedAccount.label} />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedAccount.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Buscar conta..." />
              <CommandEmpty>Sem contas cadastradas.</CommandEmpty>

              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.accounts.map((account) => (
                    <CommandItem
                      key={account.value}
                      onSelect={() => {
                        setSelectedAccount(account)
                        setOpen(false)
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${account.value}.png`}
                          alt={account.label}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {account.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedAccount.value === account.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>

            <CommandSeparator />

            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewAccountDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Criar conta
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar conta</DialogTitle>
          <DialogDescription>Adicione uma conta para gerenciar.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="account-form">
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Conta</FormLabel>
                      <FormControl>
                        <Input placeholder="Minha conta" {...field} />
                      </FormControl>
                      <FormDescription>Esse é o nome da conta para visualização.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  name="balance"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Saldo</FormLabel>
                      <FormControl>
                        <Input placeholder="R$ 00,00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between w-full space-x-1">
                <div className="space-y-2 w-full">
                  <FormField
                    name="account_number"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número da Conta</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2 w-full">
                  <FormField
                    name="agency"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agência</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-between w-full space-x-1">
                <div className="space-y-2 w-full">
                  <Label htmlFor="pix-type">Tipo da Chave Pix</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpf">
                        <span className="font-medium">CPF/CNPJ</span>
                      </SelectItem>
                      <SelectItem value="email">
                        <span className="font-medium">E-mail</span>
                      </SelectItem>
                      <SelectItem value="phone">
                        <span className="font-medium">Telefone</span>
                      </SelectItem>
                      <SelectItem value="other">
                        <span className="font-medium">Outro</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 w-full">
                  <FormField
                    name="pix"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chave Pix</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewAccountDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" form="account-form">
                Continuar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
