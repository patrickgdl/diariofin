import * as z from "zod"
import {
  isValidCNPJ,
  isValidCPF,
  isValidMobilePhone,
  isValidLandlinePhone,
  isValidCEP,
} from "@brazilian-utils/brazilian-utils"

export const addressFormSchema = z.object({
  cep: z.string().refine(
    (val) => isValidCEP(val),
    (val) => ({ message: `${val} não é um CEP válido.` })
  ),
  address: z.string(),
  number: z.string(),
  complement: z.string().nullable(),
  neighborhood: z.string(),
  city: z.string(),
  uf: z.string(),
})

export const rootFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Nome precisa ser no mínimo 2 caracteres",
    })
    .max(120),
  description: z.string().optional(),
  is_supplier: z.boolean().default(false),
  is_client: z.boolean().default(true),
  address: addressFormSchema.optional(),
})

export const clientDataFormSchema = z.object({
  person_type: z
    .enum(["physical", "legal"], {
      required_error: "Você precisa selecionar um tipo de pessoa.",
    })
    .default("physical"),
  cpf_cnpj: z
    .string()
    .refine(
      (val) => isValidCPF(val) || isValidCNPJ(val),
      (val) => ({ message: `${val} não é um CPF ou CNPJ válido.` })
    )
    .optional()
    .or(z.literal("")),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  phone: z
    .string()
    .refine(
      (val) => isValidMobilePhone(val) || isValidLandlinePhone(val),
      (val) => ({ message: `${val} não é um telefone válido.` })
    )
    .optional()
    .or(z.literal("")),
})

const withClientFormSchema = rootFormSchema.merge(clientDataFormSchema)
export default withClientFormSchema

export type ClientFormType = z.infer<typeof withClientFormSchema>
