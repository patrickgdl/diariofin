import { UseFormReturn } from "react-hook-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@fluxozen/ui/accordion"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@fluxozen/ui/form"
import { Input } from "@fluxozen/ui/input"
import { InputCurrency } from "@fluxozen/ui/input-currency-alt"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@fluxozen/ui/select"

import { AccountFormType } from "./account-form-schema"

type AccountFormProps = {
  form: UseFormReturn<AccountFormType, any, undefined>
  onSubmit: (values: AccountFormType) => void
}

const AccountForm = ({ form, onSubmit }: AccountFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="account-form">
        <div className="space-y-4">
          <div className="flex items-center space-x-1 md:space-x-4 w-full">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Conta</FormLabel>
                  <FormControl>
                    <input
                      autoFocus
                      className="flex h-9 rounded-md bg-background border-0 shadow-none font-semibold py-1 text-2xl md:text-3xl w-full transition-colors placeholder:text-gray-300 dark:placeholder:text-slate-500 placeholder:font-semibold focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Meu Banco"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="balance"
              control={form.control}
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>Saldo atual</FormLabel>
                  <FormControl>
                    <InputCurrency
                      id="input-balance"
                      name="input-balance"
                      defaultValue={field.value}
                      placeholder="R$ 00,00"
                      onCustomChange={field.onChange}
                      className="text-right w-full text-2xl md:text-3xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Informações Adicionais (opcional)</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-1">
                  <div className="flex justify-between w-full space-x-1">
                    <div className="space-y-2 w-full">
                      <FormField
                        name="account_number"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número da Conta</FormLabel>
                            <FormControl>
                              <Input {...field} value={field.value ? field.value : undefined} />
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
                              <Input {...field} value={field.value ? field.value : undefined} />
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
                            <Select onValueChange={field.onChange} value={field.value ? field.value : undefined}>
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
                              <Input {...field} value={field.value ? field.value : undefined} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* <div className="flex justify-end space-x-1">
                    <Button type="submit" form="account-form">
                      Criar
                    </Button>
                  </div> */}
        </div>
      </form>
    </Form>
  )
}

export default AccountForm
