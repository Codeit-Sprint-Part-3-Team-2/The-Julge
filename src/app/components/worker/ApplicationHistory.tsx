import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LayoutWrapper from './LayoutWrapper';
import EmptyContent from './EmptyContent';
import Pagination from './Pagination';
import { formatTimeRange, getStatus } from './Utils';
import useAuthStore from '@/app/stores/authStore';
import { getUserApplications } from '@/app/api/api';
import { UserApplication } from '@/app/types/Profile';

// 공통 스타일
const tbStyle = 'px-3 py-5 border-b border-gray-20';
const thStyle = 'px-3 py-[0.875rem] font-normal';

const ApplicationHistory = () => {
  const [applications, setApplications] = useState<UserApplication[]>([]); // 신청 내역 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 5;

  const { token, userId } = useAuthStore();
  // const userId = '19467faa-6476-4b06-824f-7c1949df167e';
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTQ2N2ZhYS02NDc2LTRiMDYtODI0Zi03YzE5NDlkZjE2N2UiLCJpYXQiOjE3MzUyODA2NTB9.kf7YQbCZ0RGcXYWf3pNuasWnNoaDbGjvEc62WSu9VyQ';
  const router = useRouter();

  useEffect(() => {
    if (!token || !userId) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    const fetchApplications = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await getUserApplications(token, userId, 0, 100);
        setApplications(res.items);
      } catch (err) {
        setError('신청 내역을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [token, userId, router]);

  // 페이지네이션
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = applications.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 수 계산
  const totalPages = Math.ceil(applications.length / itemsPerPage);

  // 페이지네이션 변경
  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <LayoutWrapper className="bg-gray-5 pb-[5rem] sm:pb-[7.5rem]">
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <span className="text-gray-40">로딩 중...</span>
        </div>
      ) : applications.length === 0 ? (
        <EmptyContent
          title="신청 내역"
          content={error || '아직 신청 내역이 없어요.'}
          buttonText="공고 보러가기"
          onButtonClick={() => router.push('/')}
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
                  {currentItems.map((item, index) => {
                    const { shop, notice, status } = item.item;
                    const { name } = shop.item;
                    const { hourlyPay, startsAt, workhour } = notice.item;

                    const statusData = getStatus(status);
                    return (
                      <tr key={index}>
                        <td className={tbStyle}>{name}</td>
                        <td className={tbStyle}>{formatTimeRange(startsAt, workhour)}</td>
                        <td className={tbStyle}>{hourlyPay.toLocaleString()}원</td>
                        <td
                          className={`${tbStyle} z-100 sticky right-0 border-l border-gray-20 bg-white lg:border-none`}
                        >
                          <div
                            className={`inline-block rounded-[1.25rem] px-[0.625rem] py-[0.375rem] text-sm font-bold ${statusData.color}`}
                          >
                            {statusData.text}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
