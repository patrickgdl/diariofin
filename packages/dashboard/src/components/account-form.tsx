import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Input } from "~/ui/input"
import { InputCurrency } from "~/ui/input-currency"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"

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

export type AccountFormType = z.infer<typeof formSchema>

type AccountFormProps = {
  onSubmit: (values: AccountFormType) => void
}

const AccountForm = ({ onSubmit }: AccountFormProps) => {
  const form = useForm<AccountFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account_number: "",
      agency: "",
      name: "",
      pix: "",
      pix_type: "",
    },
  })

  return (
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
                    <InputCurrency
                      id="input-balance"
                      name="input-balance"
                      placeholder="R$ 00,00"
                      defaultValue={field.value}
                      onCustomChange={field.onChange}
                    />
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
              <FormField
                control={form.control}
                name="pix_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="pix-type">Tipo da Chave Pix</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cpf-cnpj">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
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
      </form>
    </Form>
  )
}

export default AccountForm
