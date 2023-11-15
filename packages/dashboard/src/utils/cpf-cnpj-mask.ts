export const cpfCnpjMask = (cpfOrCnpjValue: string) => {
  if (!cpfOrCnpjValue || cpfOrCnpjValue.length === 0) return "999999999999999999"

  if (cpfOrCnpjValue.replace(/\D/g, "").length < 12) {
    return "999.999.999-999999"
  } else {
    return "99.999.999/9999-99"
  }
}
