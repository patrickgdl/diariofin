export const phoneMask = (value: string) => {
  if (!value || value.length === 0) return "999999999999999999"

  return value?.length >= 6 && value?.[5] === "9" ? "(99) 99999-9999" : "(99) 9999-9999"
}
