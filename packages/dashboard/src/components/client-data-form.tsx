import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Input } from "~/ui/input"
import { Label } from "~/ui/label"
import { RadioGroup, RadioGroupItem } from "~/ui/radio-group"

const formSchema = z.object({
  person_type: z
    .string()
    .max(10, {
      message: "Número da Conta deve conter no máximo 10 caracteres",
    })
    .optional(),
  cpf_cnpj: z
    .string()
    .max(10, {
      message: "Número da Conta deve conter no máximo 10 caracteres",
    })
    .optional(),
  email: z
    .string()
    .max(10, {
      message: "Agência deve conter no máximo 10 caracteres",
    })
    .optional(),
  name: z
    .string()
    .min(2, {
      message: "Nome precisa ser no mínimo 2 caracteres",
    })
    .max(50),
  phone: z.string().optional(),
})

export type ClientDataFormType = z.infer<typeof formSchema>

type ClientDataFormProps = {
  onSubmit: (values: ClientDataFormType) => void
}

const ClientDataForm = ({ onSubmit }: ClientDataFormProps) => {
  const form = useForm<ClientDataFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      person_type: "",
      email: "",
      cpf_cnpj: "",
      phone: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="account-form">
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <FormLabel>Tipo de Pessoa</FormLabel>

            <RadioGroup defaultValue="physical" className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="physical" id="physical" className="peer sr-only" />
                <Label
                  htmlFor="physical"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Pessoa física
                </Label>
              </div>

              <div>
                <RadioGroupItem value="legal" id="legal" className="peer sr-only" />
                <Label
                  htmlFor="legal"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Pessoa jurídica
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <FormField
              name="cpf_cnpj"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF/CNPJ</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between w-full space-x-1">
            <div className="space-y-2 w-full">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2 w-full">
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
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

export default ClientDataForm
