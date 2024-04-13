import { z } from "zod"

export const createReportSchema = z.object({
  baseUrl: z.string().url(),
  from: z.string(),
  to: z.string(),
  type: z.string(),
  expiresAt: z.string().datetime().optional(),
})

export type ReportFormType = z.infer<typeof createReportSchema>
