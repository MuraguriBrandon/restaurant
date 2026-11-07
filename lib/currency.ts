const shillingFormatter = new Intl.NumberFormat("en-KE", {
  maximumFractionDigits: 0,
})

export function formatPrice(amount: number): string {
  return `Ksh ${shillingFormatter.format(amount)}`
}
