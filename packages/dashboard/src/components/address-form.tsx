import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Input } from "~/ui/input"

const formSchema = z.object({
  cep: z
    .string()
    .max(10, {
      message: "Número da Conta deve conter no máximo 10 caracteres",
    })
    .optional(),
  address: z
    .string()
    .max(10, {
      message: "Agência deve conter no máximo 10 caracteres",
    })
    .optional(),
  number: z.coerce.number().optional(),
  complement: z
    .string()
    .min(2, {
      message: "Nome precisa ser no mínimo 2 caracteres",
    })
    .max(50),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  uf: z.string().optional(),
})

export type AddressFormType = z.infer<typeof formSchema>

type AddressFormProps = {
  onSubmit: (values: AddressFormType) => void
}

const AddressForm = ({ onSubmit }: AddressFormProps) => {
  const form = useForm<AddressFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cep: "",
      address: "",
      complement: "",
      neighborhood: "",
      city: "",
      uf: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="account-form">
        <div className="space-y-4 py-2 pb-4">
          <div className="flex justify-between w-full space-x-1">
            <div className="space-y-2 w-1/4">
              <FormField
                name="cep"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2 w-3/4">
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Rua das Flores" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 py-2 pb-4">
          <div className="flex justify-between w-full space-x-1">
            <div className="space-y-2 w-1/4">
              <FormField
                name="number"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2 w-3/4">
              <FormField
                name="complement"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
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

        <div className="space-y-4 py-2 pb-4">
          <div className="flex justify-between w-full space-x-1">
            <div className="space-y-2 w-full">
              <FormField
                name="neighborhood"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
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
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2 w-1/4">
              <FormField
                name="uf"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF</FormLabel>
                    <FormControl>
                      <Input placeholder="UF" {...field} />
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

export default AddressForm
