import { format } from 'date-fns';

export default function converDate(date: string) {
  const parsedDate = new Date(date);
  return format(parsedDate, 'yyyy-MM-dd');
}
