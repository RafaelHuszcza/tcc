export function formatPhoneNumber(number: string) {
  const cleaned = number.replace(/\D/g, '')
  const formatted = `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`
  return formatted
}
