import * as z from "zod"

export const recurringFormSchema = z.object({
  recurring_type_id: z.string(),
  max_num_of_ocurrences: z.string(),
})

export const rootFormSchema = z.object({
  amount: z.number(),
  description: z.string(),
  start_date: z.date({
    required_error: "Data da Transação é obrigatória",
  }),
  type_id: z.number().default(1),
  end_date: z.string().optional(),
  is_recurring: z.boolean(),
  is_done: z.boolean(),
  recurrence: recurringFormSchema.optional(),
})

export const transactionDataFormSchema = z.object({
  category_id: z.string(),
  client_id: z.string().optional(),
  account_id: z.string(),
})

const withTransactionFormSchema = rootFormSchema.merge(transactionDataFormSchema)
export default withTransactionFormSchema

export type TransactionFormType = z.infer<typeof withTransactionFormSchema>
