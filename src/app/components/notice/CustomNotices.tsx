import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import { FreeMode, Autoplay } from 'swiper/modules';
import Card from '../common/Card';
import formatTimeRange from '../../utils/formatTimeRange';
import { useRecentNoticesStore } from '@/app/stores/useRecentNoticesStore';
import useAuthStore from '@/app/stores/authStore';
import isPastNotice from '@/app/utils/isPastNotice';
import LoadingSpinner from '../common/LoadingSpinner';
import { NoticeItem } from '@/app/types/Notice';
import { fetchCustomNotices } from '@/app/api/noticeApi';

export default function CustomNotices() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const addNotice = useRecentNoticesStore((state) => state.addNotice);
  const { isInitialized, getMe, type, token, userId } = useAuthStore();

  useEffect(() => {
    const loadCustomNotices = async () => {
      setLoading(true);
      try {
        let userAddress: string | undefined;

        if (isInitialized && type === 'employee' && token && userId) {
          const profile = await getMe();
          userAddress = profile.item.address;
        }

        let fetchedNotices = await fetchCustomNotices(userAddress);

        if (fetchedNotices.length === 0) {
          fetchedNotices = await fetchCustomNotices();
        }

        setNotices(fetchedNotices);
      } catch (error) {
        console.error('Error loading notices:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomNotices();
  }, [isInitialized, getMe, type, token, userId]);

  if (loading || notices.length === 0) {
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
