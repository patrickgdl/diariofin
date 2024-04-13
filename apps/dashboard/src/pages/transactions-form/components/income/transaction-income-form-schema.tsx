import * as z from "zod"

export const transactionIncomeFormSchema = z.object({
  amount: z.number({ required_error: "Valor é obrigatório" }).gt(0, { message: "Valor precisa ser maior que zero" }),
  description: z
    .string({ required_error: "Descrição é obrigatório" })
    .trim()
    .min(1, { message: "Descrição é obrigatório" }),
  date: z.date({ required_error: "Data da Transação é obrigatório" }),
  notes: z.string().optional().nullable(),
  type_id: z.number(),
  is_recurring: z.boolean().default(false),
  is_done: z.boolean(),
  category_id: z.string().optional().nullable(),
  client_id: z.string().optional().nullable(),
  account_id: z.string({ required_error: "Conta é obrigatório" }),
  recurring_type_id: z.string().optional(),
  max_num_of_ocurrences: z.string().optional(),
})
// .superRefine(({ is_recurring, recurring_type_id }, ctx) => {
//   if (is_recurring && !recurring_type_id) {
//     // If is_recurring is defined, recurring_type_id becomes required
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Período é obrigatório quando 'Recorrência' é habilitada",
//       path: ["recurring_type_id"],
//     })
//   }
// })

export default transactionIncomeFormSchema
export type TransactionIncomeFormType = z.infer<typeof transactionIncomeFormSchema>
