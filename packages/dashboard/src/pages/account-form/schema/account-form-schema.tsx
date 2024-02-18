import * as z from "zod"

const accountFormSchema = z.object({
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
  balance: z.number({ required_error: "Valor é obrigatório" }).gt(0, { message: "Valor precisa ser maior que zero" }),
  name: z
    .string()
    .min(2, {
      message: "Nome precisa ser no mínimo 2 caracteres",
    })
    .max(50),
  pix: z.string().optional(),
  pix_type: z.string().optional(),
})

export default accountFormSchema
export type AccountFormType = z.infer<typeof accountFormSchema>
