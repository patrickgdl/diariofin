import * as z from "zod"

export const transactionFormSchema = z.object({
  amount: z.number({ required_error: "Valor é obrigatório" }).gt(0, { message: "Valor precisa ser maior que zero" }),
  description: z.string({ required_error: "Descrição é obrigatório" }),
  start_date: z.date({ required_error: "Data da Transação é obrigatório" }),
  type_id: z.number(),
  end_date: z.string().nullable().default(null),
  is_recurring: z.boolean().default(false),
  is_done: z.boolean(),
  category_id: z.string({ required_error: "Categoria é obrigatório" }),
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

export default transactionFormSchema
export type TransactionFormType = z.infer<typeof transactionFormSchema>
