// 날짜 포맷팅
export const formatTimeRange = (startTime: string, workHours: number): string => {
  // startTime을 Date 객체로 변환
  const start = new Date(startTime);
  if (isNaN(start.getTime())) {
    throw new Error("Invalid start time format");
  }

  // 종료 시간 계산 (workHours만큼 더함)
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

  // 시작 시간과 종료 시간 포맷팅
  const startTimeStr = formatDate(start);
  const endTimeStr = formatDate(end);

  // 날짜와 시간을 분리 (예: "2024-12-22 09:00 ~ 12:00")
  const [startDate, startHour] = startTimeStr.split(' '); // startHour로 변수명을 변경
  const [, endTime] = endTimeStr.split(' ');

  // 결과 문자열 생성 (시작 시간과 종료 시간 출력)
  return `${startDate} ${startHour} ~ ${endTime} (${workHours}시간)`;
};


export const getStatusColor = (status: string) => {
  switch (status) {
    case '승인완료':
      return 'text-blue-20 bg-blue-10';
    case '거절':
      return 'text-red-40 bg-red-10';
    case '대기중':
      return 'text-green-20 bg-green-10';
    default:
      return '';
  }
};
