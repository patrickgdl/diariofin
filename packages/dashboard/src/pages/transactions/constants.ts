export const TRANSACTION_TYPE = {
  INCOME: 1,
  EXPENSE: 2,
}

export const TRANSACTION_QUERY = `
  id,
  amount,
  description,
  transaction_types (
    id,
    name
  ),
  account (
    id,
    name
  ),
  transaction_categories (
    id,
    name
  ),
  clients (
    id,
    name
  )
`
