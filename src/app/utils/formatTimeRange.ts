export default function formatTimeRange(startsAt: string, workhour: number) {
  const startTime = new Date(startsAt);
  const endTime = new Date(startTime.getTime() + workhour * 60 * 60 * 1000);

  const startHours = startTime.getHours().toString().padStart(2, '0');
  const startMinutes = startTime.getMinutes().toString().padStart(2, '0');
  const endHours = endTime.getHours().toString().padStart(2, '0');
  const endMinutes = endTime.getMinutes().toString().padStart(2, '0');

  return `${startHours}:${startMinutes}~${endHours}:${endMinutes} (${workhour}시간)`;
}
