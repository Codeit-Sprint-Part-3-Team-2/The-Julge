import { Notice } from '../types/Shop';

interface NoticeItem {
  item: Notice;
  links: [];
}

export default function calculateAverageHourlyPay(notice: NoticeItem[]) {
  const averageHourlyPay = notice.reduce((acc, cur) => acc + cur.item.hourlyPay, 0) / notice.length;
  return averageHourlyPay;
}
