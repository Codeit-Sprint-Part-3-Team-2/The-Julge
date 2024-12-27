'use client';

import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import formatTimeRange from '@/app/utils/formatTimeRange';
import { fetchNotices } from '@/app/api/noticeApi';
import { useRecentNoticesStore } from '@/app/stores/useRecentNoticesStore';
import isPastNotice from '@/app/utils/isPastNotice';
import LoadingSpinner from '../common/LoadingSpinner';
import { AllNoticesProps, NoticeItem } from '@/app/types/Notice';

export default function AllNotices({
  currentPage,
  itemsPerPage,
  setTotalItems,
  sortOption,
  filterOptions,
  query = '',
}: AllNoticesProps) {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const addNotice = useRecentNoticesStore((state) => state.addNotice);

  useEffect(() => {
    const getNotices = async () => {
      setLoading(true);
      try {
        const { items, count } = await fetchNotices(
          currentPage,
          itemsPerPage,
          sortOption,
          filterOptions,
          query
        );
        setNotices(items);
        setTotalItems(count);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    getNotices();
  }, [currentPage, itemsPerPage, setTotalItems, sortOption, filterOptions, query]);

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {notices.length > 0 ? (
        notices.map((notice) => {
          const increaseRate = (
            ((notice.hourlyPay - notice.shop.item.originalHourlyPay) /
              notice.shop.item.originalHourlyPay) *
            100
          ).toFixed(0);

          const isPast = isPastNotice(notice.startsAt);

          return (
            <div key={notice.id} className="w-44 sm:w-[312px]">
              <Card
                image={notice.shop.item.imageUrl}
                title={notice.shop.item.name}
                date={notice.startsAt.split('T')[0]}
                hours={formatTimeRange(notice.startsAt, notice.workhour)}
                location={notice.shop.item.address1}
                price={`${Number(notice.hourlyPay).toLocaleString()}원`}
                discount={
                  parseFloat(increaseRate) > 0 ? `기존 시급보다 ${increaseRate}%` : undefined
                }
                noticeId={notice.id}
                shopId={notice.shopId}
                onClick={() => addNotice(notice)}
                closed={notice.closed}
                past={isPast}
              />
            </div>
          );
        })
      ) : (
        <div className="col-span-2 flex flex-col items-center justify-center lg:col-span-3">
          <p className="mt-10 text-lg text-gray-black">해당 조건에 맞는 공고가 없습니다.</p>
          <p className="text-sm text-orange">검색어와 필터를 다시 설정해보세요!</p>
        </div>
      )}
    </div>
  );
}
