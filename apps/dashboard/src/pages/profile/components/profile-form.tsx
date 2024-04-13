import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@fluxozen/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@fluxozen/ui/form"
import { Input } from "@fluxozen/ui/input"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Nome do usuário deve ser no mínimo 2 caracteres.",
    })
    .max(30, {
      message: "Nome do usuário não pode ultrapassar 30 caracteres",
    }),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

type ProfileFormProps = {
  defaultValues: ProfileFormValues
  onSubmit: (data: ProfileFormValues) => void
}

export function ProfileForm({ defaultValues, onSubmit }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome aqui" {...field} />
              </FormControl>
              <FormDescription>Esse é seu nome. Ele pode ser seu nome real ou apelido, você escolhe.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Atualizar perfil</Button>
      </form>
    </Form>
  )
}
