'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import { FreeMode, Autoplay } from 'swiper/modules';
import Card from '../common/Card';
import axios from 'axios';
import formatTimeRange from '../../utils/formatTimeRange';
import { useRecentNoticesStore } from '@/app/stores/useRecentNoticesStore';
import isPastNotice from '@/app/utils/isPastNotice';
import LoadingSpinner from '../common/LoadingSpinner';
import { NoticeItem, ApiResponse } from '@/app/types/Notice';

export default function CustomNotices() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const addNotice = useRecentNoticesStore((state) => state.addNotice);

  useEffect(() => {
    const fetchCustomNotices = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ApiResponse<NoticeItem>>(
          'https://bootcamp-api.codeit.kr/api/11-2/the-julge/notices?offset=0&limit=20'
        );
        /*
        해당 부분 코드는 정민님이 프로필 로직 구현하시면 후에 수정할 예정이기에 따로 api 파일에 관리하지 않고 있습니다.
        */

        const formattedData = response.data.items.map((data: { item: NoticeItem }) => ({
          ...data.item,
          shopId: data.item.shop.item.id,
        }));

        setNotices(formattedData);
      } catch (error) {
        console.error('Error fetching custom notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomNotices();
  }, []);

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Swiper
      modules={[FreeMode, Autoplay]}
      spaceBetween={12}
      slidesPerView="auto"
      freeMode={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: { spaceBetween: 14 },
      }}
    >
      {notices.map((notice) => {
        const increaseRate = (
          ((notice.hourlyPay - notice.shop.item.originalHourlyPay) /
            notice.shop.item.originalHourlyPay) *
          100
        ).toFixed(0);

        const isPast = isPastNotice(notice.startsAt);

        return (
          <SwiperSlide key={notice.id} className="max-w-[176px] sm:max-w-[312px]">
            <Card
              image={notice.shop.item.imageUrl}
              title={notice.shop.item.name}
              date={notice.startsAt.split('T')[0]}
              hours={formatTimeRange(notice.startsAt, notice.workhour)}
              location={notice.shop.item.address1}
              price={`${Number(notice.hourlyPay).toLocaleString()}원`}
              discount={parseFloat(increaseRate) > 0 ? `기존 시급보다 ${increaseRate}%` : undefined}
              noticeId={notice.id}
              shopId={notice.shop.item.id}
              onClick={() => addNotice(notice)}
              closed={notice.closed}
              past={isPast}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
