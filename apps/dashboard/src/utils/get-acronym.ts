export function getAcronym(name: string): string {
  const acronym = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()

  const firstLetter = acronym[0]
  const lastLetter = acronym[acronym.length - 1]

  return firstLetter + lastLetter
}
