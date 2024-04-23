import { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@diariofin/ui/form"
import { Input } from "@diariofin/ui/input"
import { InputMask } from "@diariofin/ui/input-mask"
import { RadioGroup, RadioGroupItem } from "@diariofin/ui/radio-group"
import { cpfCnpjMask } from "~/utils/cpf-cnpj-mask"
import { phoneMask } from "~/utils/phone-mask"

import { ClientFormType } from "./schema/client-form-schema"

type ClientDataFormProps = {
  form: UseFormReturn<ClientFormType, any, undefined>
}

const ClientDataForm = ({ form }: ClientDataFormProps) => {
  return (
    <div className="space-y-4 py-2 pb-4">
      <FormField
        name="person_type"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Tipo de Pessoa</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="physical" className="peer sr-only" />
                  </FormControl>
                  <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Pessoa Física
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="legal" className="peer sr-only" />
                  </FormControl>
                  <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Pessoa Jurídica
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="cpf_cnpj"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>CPF/CNPJ</FormLabel>
            <FormControl>
              <InputMask
                maskChar=""
                defaultValue={field.value || ""}
                onChange={field.onChange}
                mask={cpfCnpjMask(field.value || "")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex w-full space-x-1">
        <div className="w-full">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <InputMask
                    maskChar=""
                    placeholder="(__) ____-____"
                    defaultValue={field.value || ""}
                    onChange={field.onChange}
                    mask={phoneMask(field.value || "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default ClientDataForm
