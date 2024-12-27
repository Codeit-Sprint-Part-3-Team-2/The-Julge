// 날짜 포맷팅
export const formatTimeRange = (startTime: string, workHours: number): string => {
  const start = new Date(startTime);
  if (isNaN(start.getTime())) {
    throw new Error('Invalid start time format');
  }

  // 종료 시간 계산
  const end = new Date(start.getTime() + workHours * 60 * 60 * 1000);

  // 날짜 포맷팅 함수
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // 시작 시간과 종료 시간
  const startTimeStr = formatDate(start);
  const endTimeStr = formatDate(end);

  // 날짜와 시간 분리
  const [startDate, startHour] = startTimeStr.split(' ');
  const [, endTime] = endTimeStr.split(' ');

  // 시간 출력
  return `${startDate} ${startHour} ~ ${endTime} (${workHours}시간)`;
};

// 신청내역 상태
export const getStatus = (status: string) => {
  switch (status) {
    case 'accepted':
      return {
        text: '승인완료',
        color: 'text-blue-20 bg-blue-10',
      };
    case 'pending':
      return {
        text: '대기중',
        color: 'text-green-20 bg-green-10',
      };
    case 'rejected':
      return {
        text: '거절',
        color: 'text-red-40 bg-red-10',
      };
    case 'canceled':
      return {
        text: '취소됨',
        color: 'text-gray-40 bg-gray-10',
      };
    default:
      return {
        text: '기타',
        color: '',
      };
  }
};
