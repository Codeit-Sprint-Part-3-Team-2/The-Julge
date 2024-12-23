export default function isPastNotice(startDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDateObj = new Date(startDate);
  startDateObj.setHours(0, 0, 0, 0);

  return startDateObj < today;
}
