import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const transactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  description: z.string().nullable(),
  // date: z.string(),
  clients: z
    .object({
      id: z.string(),
      name: z.string().nullable(),
    })
    .nullable(),
  account: z
    .object({
      id: z.string(),
      name: z.string().nullable(),
    })
    .nullable(),
  transaction_types: z
    .object({
      id: z.string(),
      name: z.string().nullable(),
    })
    .nullable(),
  transaction_categories: z
    .object({
      id: z.string(),
      name: z.string().nullable(),
    })
    .nullable(),
})

export type Transaction = z.infer<typeof transactionSchema>
