export function priceFormat(price, withCurrency = true) {
  if (!price) return null
  const currency = '₽'
  const priceWithSpaces = price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')
  return withCurrency ? `${priceWithSpaces}\u00a0${currency}` : priceWithSpaces
}
