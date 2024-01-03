export const TRANSACTION_TYPE = {
  EXPENSE: "e18bb7e2-9eac-4fd1-9830-98b3a99173a9",
  INCOME: "ee9b7660-332f-4ae3-a6d6-4c630bad2b13",
}

export const TRANSACTION_QUERY = `
  id,
  amount,
  description,
  done,
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
