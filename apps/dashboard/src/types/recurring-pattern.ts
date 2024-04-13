export interface RecurringPattern {
  day_of_month: number | null
  day_of_week: number | null
  max_num_of_ocurrences: number | null
  month_of_year: number | null
  recurring_type_id: number
  separation_count: number | null
  transaction_id: string
  week_of_month: number | null
  user_id: string
}
