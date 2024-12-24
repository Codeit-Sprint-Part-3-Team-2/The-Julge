'use client';

import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import formatTimeRange from '@/app/utils/formatTimeRange';
import { fetchNotices } from '@/app/api/noticeApi';
import { useRecentNoticesStore } from '@/app/stores/useRecentNoticesStore';
import isPastNotice from '@/app/utils/isPastNotice';

interface ShopItem {
  id: string;
  name: string;
  address1: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface NoticeItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: ShopItem;
  };
  shopId: string;
}

interface AllNoticesProps {
  currentPage: number;
  itemsPerPage: number;
  setTotalItems: (total: number) => void;
  sortOption: string;
  filterOptions: { locations: string[]; startDate: string; amount: string };
  query?: string;
}

export default function AllNotices({
  currentPage,
  itemsPerPage,
  setTotalItems,
  sortOption,
  filterOptions,
  query = '',
}: AllNoticesProps) {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const addNotice = useRecentNoticesStore((state) => state.addNotice);

  useEffect(() => {
    const getNotices = async () => {
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
      }
    };

    getNotices();
  }, [currentPage, itemsPerPage, setTotalItems, sortOption, filterOptions, query]);

  if (notices.length === 0) {
    return <div className="text-center text-gray-40">해당하는 공고 목록이 존재하지 않아요.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {notices.map((notice) => {
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
              price={`${notice.hourlyPay.toLocaleString()}원`}
              discount={parseFloat(increaseRate) > 0 ? `기존 시급보다 ${increaseRate}%` : undefined}
              noticeId={notice.id}
              shopId={notice.shopId}
              onClick={() => addNotice(notice)}
              closed={notice.closed}
              past={isPast}
            />
          </div>
        );
      })}
    </div>
  );
}
