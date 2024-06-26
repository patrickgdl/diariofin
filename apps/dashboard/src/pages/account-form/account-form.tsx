import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import useAccountById from "~/hooks/useAccountByIdQuery"
import useAppContext from "~/hooks/useAppContext"
import { useNewAccountMutation } from "~/hooks/useNewAccountMutation"
import { useUpdateAccountMutation } from "~/hooks/useUpdateAccountMutation"
import { Button } from "@diariofin/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@diariofin/ui/form"
import { Input } from "@diariofin/ui/input"
import { InputCurrency } from "@diariofin/ui/input-currency-alt"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@diariofin/ui/select"

import accountFormSchema, { AccountFormType } from "./schema/account-form-schema"
import { useAuthUser } from "~/contexts/SessionContext"

const AccountForm = () => {
  let { id } = useParams()
  const navigate = useNavigate()

  const { id: user_id } = useAuthUser() || {}
  const { accounts, setAccounts } = useAppContext()

  const isAddMode = id === "new"
  const { data: accountToUpdate } = useAccountById(id)

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

  const newAccount = useNewAccountMutation()
  const updateAccount = useUpdateAccountMutation()

  const handleSubmit = async (values: AccountFormType) => {
    if (!user_id) return

    if (isAddMode) {
      newAccount.mutate(
        { ...values, active: true, user_id },
        {
          onSuccess: (response) => {
            if (response) {
              setAccounts([...accounts, ...response])
              navigate(`/overview/${response[0].id}`)
            }
          },
        }
      )
    } else {
      updateAccount.mutate({
        id: id!,
        account: { ...values },
      })
    }

    navigate("/accounts")
  }

  React.useEffect(() => {
    if (accountToUpdate) {
      form.reset({
        ...accountToUpdate,
        account_number: accountToUpdate.account_number || "",
        agency: accountToUpdate.agency || "",
        pix: accountToUpdate.pix || "",
        pix_type: accountToUpdate.pix_type || "",
      })
    }
  }, [accountToUpdate])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} id="account-form">
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <FormField
              name="balance"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Saldo atual</FormLabel>
                  <FormControl>
                    <InputCurrency
                      id="input-balance"
                      name="input-balance"
                      defaultValue={field.value}
                      placeholder="R$ 00,00"
                      disabled={!isAddMode}
                      onCustomChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <div className="flex justify-end space-x-1">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancelar
            </Button>

            <Button type="submit" form="account-form">
              {isAddMode ? "Criar" : "Atualizar"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default AccountForm
