export function currencyFormat(number) {
  // Expects number to be in cents
  return '$' + (number / 100).toFixed(2);
}
export function getStartOfNextMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month+1, 1);
}
export function monthAbbreviation(date) {
  const monthName = date.toLocaleString('default', { month: 'long' });
  return monthName.substring(0, 3);
}