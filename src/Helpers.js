export function currencyFormat(number) {
  return '$' + (number / 100).toFixed(2);
}