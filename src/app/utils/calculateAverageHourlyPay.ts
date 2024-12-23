import { Notice } from '../types/Shop';

export default function calculateAverageHourlyPay(notice: Notice[]) {
  const averageHourlyPay = notice.reduce((acc, cur) => acc + cur.item.hourlyPay, 0) / notice.length;
  return averageHourlyPay;
}
