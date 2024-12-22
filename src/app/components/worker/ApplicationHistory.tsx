import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutWrapper from './LayoutWrapper';
import EmptyContent from './EmptyContent';
import Pagination from './Pagination';
import { formatTimeRange, getStatusColor } from './Utils';

// 임시 신청 내역 데이터
const applicationData = [
  {
    storeName: '가게1',
    startTime: '2024-07-01 15:00',
    workHours: 2,
    hourlyRate: 15000,
    status: '승인완료',
  },
  {
    storeName: '가게2',
    startTime: '2024-07-02 09:00',
    workHours: 3,
    hourlyRate: 12000,
    status: '대기중',
  },
  {
    storeName: '가게3',
    startTime: '2024-07-03 14:00',
    workHours: 4,
    hourlyRate: 14000,
    status: '거절',
  },
  {
    storeName: '가게4',
    startTime: '2024-07-04 08:00',
    workHours: 2,
    hourlyRate: 16000,
    status: '승인완료',
  },
  {
    storeName: '가게5',
    startTime: '2024-07-05 10:00',
    workHours: 2,
    hourlyRate: 15000,
    status: '대기중',
  },
  {
    storeName: '가게6',
    startTime: '2024-07-06 11:00',
    workHours: 3,
    hourlyRate: 18000,
    status: '승인완료',
  },
];

// 공통 스타일
const tbStyle = 'px-3 py-5 border-b border-gray-20';
const thStyle = 'px-3 py-[0.875rem] font-normal';

const ApplicationHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  // 페이지네이션: 현재 페이지에 해당하는 데이터
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = applicationData.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 수 계산
  const totalPages = Math.ceil(applicationData.length / itemsPerPage);

  // 페이지네이션 변경
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 공고보러가기
  const handleClick = () => {
    router.push('/posts');
  };

  return (
    <LayoutWrapper className="bg-gray-5 pb-[5rem] sm:pb-[7.5rem]">
      {applicationData.length === 0 ? (
        <EmptyContent
          title="신청 내역"
          content="아직 신청 내역이 없어요."
          buttonText="공고 보러가기"
          onButtonClick={handleClick}
        />
      ) : (
        <>
          <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-[1.75rem]">신청 내역</h2>
          <div className="rounded-[0.625rem] border border-gray-20 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[964px] border-separate border-spacing-0">
                <colgroup>
                  <col className="w-1/5" />
                  <col className="w-2/5" />
                  <col className="w-1/5" />
                  <col className="w-1/5" />
                </colgroup>
                <thead className="bg-red-10 text-left text-sm">
                  <tr>
                    <th className={thStyle}>가게</th>
                    <th className={thStyle}>일자</th>
                    <th className={thStyle}>시급</th>
                    <th
                      className={`${thStyle} z-100 sticky right-0 border-l border-gray-20 bg-red-10 lg:border-none`}
                    >
                      상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td className={tbStyle}>{item.storeName}</td>
                      <td className={tbStyle}>{formatTimeRange(item.startTime, item.workHours)}</td>
                      <td className={tbStyle}>{item.hourlyRate.toLocaleString()}원</td>
                      <td
                        className={`${tbStyle} z-100 sticky right-0 border-l border-gray-20 bg-white lg:border-none`}
                      >
                        <div
                          className={`inline-block rounded-[1.25rem] px-[0.625rem] py-[0.375rem] text-sm font-bold ${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
          </div>
        </>
      )}
    </LayoutWrapper>
  );
};

export default ApplicationHistory;
