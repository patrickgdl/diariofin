export const REFUND_CATEGORY_ID = "97b483f4-5452-43e4-9d40-2eadc28bfc0f"

export const TRANSACTION_TYPE = {
  INCOME: 1,
  EXPENSE: 2,
}

export const TRANSACTION_QUERY = `
  id,
  amount,
  description,
  date,
  notes,
  user_id,
  is_recurring,
  transactions_instance!inner(is_done, is_cancelled, is_refunded),
  account!inner(id, name),
  transaction_types (
    id,
    name
  ),
  clients (
    id,
    name
  ),
  transaction_categories (
    id,
    name,
    icon,
    category_groups (
      id, 
      name, 
      color
    )
  )
`
