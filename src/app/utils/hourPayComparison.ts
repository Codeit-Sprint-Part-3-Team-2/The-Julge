export function hourPayComparisom(originalHourlyPay: number, hourlyPay: number) {
  const isHigherThanAverage = hourlyPay >= originalHourlyPay * 1.1;
  const percentageDifference = ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100;

  return { isHigherThanAverage, percentageDifference };
}
