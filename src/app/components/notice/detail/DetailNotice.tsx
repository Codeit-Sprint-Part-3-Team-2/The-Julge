'use client';

import formatTimeRange from '@/app/utils/formatTimeRange';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../../common/Button';
import LoadingSpinner from '../../common/LoadingSpinner';
import getDiscountClass from '@/app/utils/getDiscountClass';
import isPastNotice from '@/app/utils/isPastNotice';
import NoticeModal from '../detail/NoticeModal';
import {
  fetchNoticeDetail,
  fetchApplicationId,
  applyForNotice,
  cancelApplication,
} from '@/app/api/noticeApi';
import { NoticeDetail } from '@/app/types/Notice';
import useAuthStore from '@/app/stores/authStore';

export default function DetailNotice() {
  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isApplied, setIsApplied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [modalVariant, setModalVariant] = useState<'alert' | 'confirm'>('alert');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  const params = useParams();
  const router = useRouter();
  const shopId = params.shopId as string;
  const noticeId = params.noticeId as string;
  const { userId } = useAuthStore((state) => state);

  useEffect(() => {
    if (shopId && noticeId) {
      const fetchNotice = async () => {
        try {
          const noticeData = await fetchNoticeDetail(shopId, noticeId);
          setNotice(noticeData);
        } catch (error) {
          console.error('Error fetching notice details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchNotice();
    }
  }, [shopId, noticeId]);

  useEffect(() => {
    if (shopId && noticeId && userId) {
      const checkApplication = async () => {
        try {
          const applicationId = await fetchApplicationId(shopId, noticeId, userId);
          if (applicationId) {
            setIsApplied(true);
          }
        } catch (error) {
          console.error('Error checking application:', error);
        }
      };

      checkApplication();
    }
  }, [shopId, noticeId, userId]);

  const handleApply = async () => {
    const { getMe, type, token } = useAuthStore.getState();

    try {
      if (!token) {
        setModalContent('로그인이 필요합니다.');
        setModalVariant('alert');
        setOnConfirm(() => () => router.push('/login'));
        setModalOpen(true);
        return;
      }

      if (type === 'employer') {
        setModalContent('"사장"님은 지원하실 수 없어요!');
        setModalVariant('alert');
        setOnConfirm(() => () => router.push('/'));
        setModalOpen(true);
        return;
      }
      const profile = await getMe();

      if (!profile.item.name) {
        setModalContent('내 프로필을 먼저 등록해 주세요.');
        setModalVariant('alert');
        setOnConfirm(() => () => router.push('/worker/profile/register'));
        setModalOpen(true);
        return;
      }

      await applyForNotice(shopId, noticeId);
      setIsApplied(true);
      setModalContent('신청이 완료되었습니다.');
      setModalVariant('alert');
      setOnConfirm(() => () => setModalOpen(false));
      setModalOpen(true);
    } catch (error) {
      console.error('Error applying:', error);
      setModalContent('신청 중 오류가 발생했습니다.');
      setModalVariant('alert');
      setOnConfirm(() => () => setModalOpen(false));
      setModalOpen(true);
    }
  };

  const handleCancel = async () => {
    if (!userId) {
      setModalContent('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
      setModalVariant('alert');
      setOnConfirm(() => () => setModalOpen(false));
      setModalOpen(true);
      return;
    }
    setModalContent('신청을 취소하시겠어요?');
    setModalVariant('confirm');
    setOnConfirm(() => async () => {
      try {
        const applicationId = await fetchApplicationId(shopId, noticeId, userId);
        if (!applicationId) {
          setModalContent('신청 정보를 찾을 수 없습니다.');
          setModalVariant('alert');
          setOnConfirm(() => () => setModalOpen(false));
          return;
        }

        await cancelApplication(shopId, noticeId, applicationId);
        setIsApplied(false);
        setModalContent('신청이 취소되었습니다.');
        setModalVariant('alert');
        setOnConfirm(() => () => setModalOpen(false));
      } catch (error) {
        console.error('Error canceling application:', error);
        setModalContent('취소 중 오류가 발생했습니다.');
        setModalVariant('alert');
        setOnConfirm(() => () => setModalOpen(false));
      }
      setModalOpen(true);
    });
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p>공고 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  const increaseRate = (
    ((notice.hourlyPay - notice.shop.item.originalHourlyPay) / notice.shop.item.originalHourlyPay) *
    100
  ).toFixed(0);

  const contentStyle = 'flex items-center gap-1 text-sm text-gray-50 sm:text-base';

  const isPast = isPastNotice(notice.startsAt);

  return (
    <div>
      <div className="mb-4">
        <h2 className="mb-1 text-sm font-bold text-orange sm:text-base">
          {notice.shop.item.category}
        </h2>
        <h1 className="text-xl font-bold text-gray-black sm:text-[28px]">
          {notice.shop.item.name}
        </h1>
      </div>
      <div className="h-auto w-full rounded-xl border border-gray-20 bg-white p-5 lg:flex lg:h-[356px] lg:w-[963px] lg:p-7">
        <div className="relative h-44 w-full sm:h-[360px] lg:h-[308px] lg:w-[540px]">
          {(notice.closed || isPast) && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black bg-opacity-70">
              <span className="text-xl font-bold text-gray-30 sm:text-[28px]">
                {notice.closed ? '마감 완료' : '지난 공고'}
              </span>
            </div>
          )}
          <Image
            src={notice.shop.item.imageUrl}
            alt={notice.shop.item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="rounded-xl object-cover"
          />
        </div>
        <div className="relative mt-3 flex flex-col gap-1 sm:gap-2 lg:ml-7 lg:w-[346px]">
          <h2 className="text-sm font-bold text-orange sm:text-base">시급</h2>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-gray-black sm:text-[28px]">
              {notice.hourlyPay.toLocaleString()}원
            </p>
            {parseFloat(increaseRate) > 0 && (
              <span
                className={`flex h-6 w-32 items-center justify-center rounded-[20px] text-xs sm:h-9 sm:w-40 sm:text-sm sm:font-bold ${getDiscountClass(
                  increaseRate
                )}`}
              >
                기존 시급보다 {increaseRate}% 🡅
              </span>
            )}
          </div>
          <div className={`${contentStyle} mt-2`}>
            <Image
              src="/images/clock-icon.svg"
              alt="시계"
              width={16}
              height={16}
              className="object-contain sm:h-5 sm:w-5"
            />
            <p>{notice.startsAt.split('T')[0]}</p>
            <p>{formatTimeRange(notice.startsAt, notice.workhour)}</p>
          </div>
          <div className={contentStyle}>
            <Image
              src="/images/location.svg"
              alt="위치"
              width={16}
              height={16}
              className="object-contain sm:h-5 sm:w-5"
            />
            <p>{notice.shop.item.address1}</p>
          </div>
          <p className="mt-2 text-sm text-gray-black sm:text-base">{notice.description}</p>
          <Button
            className="mt-7 h-[38px] w-full sm:h-[48px] lg:absolute lg:bottom-0 lg:mt-0"
            onClick={isApplied ? handleCancel : handleApply}
            disabled={notice.closed || isPast}
            variant={isApplied ? 'reverse' : 'primary'}
          >
            {notice.closed || isPast ? '신청 불가' : isApplied ? '취소하기' : '신청하기'}
          </Button>
        </div>
      </div>
      <NoticeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        content={modalContent}
        confirmText={modalVariant === 'confirm' ? '취소하기' : '확인'}
        cancelText="아니오"
        variant={modalVariant}
        onConfirm={onConfirm}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}
