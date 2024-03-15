export const hexToRgb = (hex: string, alpha?: string): string => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)

  if (alpha) {
    return `rgb(${r}, ${g}, ${b}, ${alpha})`
  }

  return `rgb(${r}, ${g}, ${b})`
}
