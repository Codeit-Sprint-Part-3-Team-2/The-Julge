import React from 'react';
import { useRecentNoticesStore } from '@/app/stores/useRecentNoticesStore';
import Card from '../../common/Card';
import formatTimeRange from '@/app/utils/formatTimeRange';
import isPastNotice from '@/app/utils/isPastNotice';

export default function RecentNoticesPage() {
  const recentNotices = useRecentNoticesStore((state) => state.recentNotices);
  const addNotice = useRecentNoticesStore((state) => state.addNotice);

  if (recentNotices.length === 0) {
    return <p className="text-center">최근에 본 공고가 없습니다.</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-black sm:text-[28px]">최근에 본 공고</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:mt-8 lg:grid-cols-3">
        {recentNotices.map((notice) => {
          const increaseRate = (
            ((notice.hourlyPay - notice.shop.item.originalHourlyPay) /
              notice.shop.item.originalHourlyPay) *
            100
          ).toFixed(0);

          const isPast = isPastNotice(notice.startsAt);

          return (
            <Card
              key={notice.id}
              image={notice.shop.item.imageUrl}
              title={notice.shop.item.name}
              date={notice.startsAt.split('T')[0]}
              hours={formatTimeRange(notice.startsAt, notice.workhour)}
              location={notice.shop.item.address1}
              price={`${notice.hourlyPay.toLocaleString()}원`}
              discount={parseFloat(increaseRate) > 0 ? `기존 시급보다 ${increaseRate}%` : undefined}
              noticeId={notice.id}
              shopId={notice.shopId}
              onClick={() => addNotice(notice)}
              closed={notice.closed}
              past={isPast}
            />
          );
        })}
      </div>
    </div>
  );
}
