import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const transactionSchema = z.object({
  date: z.string(),
  description: z.string(),
  client: z.string(),
  done: z.boolean(),
  category: z.string(),
  account: z.string(),
  amount: z.number(),
})

export type Task = z.infer<typeof transactionSchema>
