import { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Input } from "~/ui/input"
import { InputMask } from "~/ui/input-mask"

import { ClientFormType } from "./client-form-schema"

type AddressFormProps = {
  form: UseFormReturn<ClientFormType, any, undefined>
}

const AddressForm = ({ form }: AddressFormProps) => {
  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="flex justify-between w-full space-x-1">
        <div className="w-1/4">
          <FormField
            name="address.cep"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <InputMask maskChar="" defaultValue={field.value} onChange={field.onChange} mask="99.999-999" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-3/4">
          <FormField
            name="address.address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Rua das Flores" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex justify-between w-full space-x-1">
        <div className="w-1/4">
          <FormField
            name="address.number"
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

        <div className="w-3/4">
          <FormField
            name="address.complement"
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

      <div className="flex justify-between w-full space-x-1">
        <div className="w-full">
          <FormField
            name="address.neighborhood"
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

        <div className="w-full">
          <FormField
            name="address.city"
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

        <div className="w-1/4">
          <FormField
            name="address.uf"
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
  )
}

export default AddressForm
