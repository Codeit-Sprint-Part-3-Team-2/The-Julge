import Image from 'next/image';
import Button from '@/app/components/common/Button';
import { NoticeDetail } from '@/app/types/Shop';
import Information from '../Information';
import Link from 'next/link';
import converDate from '@/app/utils/converDate';
import formatTimeRange from '@/app/utils/formatTimeRange';
import HigherAverageBadge from '../HigherAverageBadge';

export default function MyNotice({ notice }: { notice: NoticeDetail }) {
  const date = `${converDate(notice.startsAt)} ${formatTimeRange(notice.startsAt, notice.workhour)}`;

  return (
    <>
      <div className="flex w-full flex-col rounded-xl border bg-white p-6 md:h-[22.25rem] md:flex-row md:items-center md:gap-8">
        <div className="relative h-[11rem] w-full overflow-hidden rounded-xl sm:h-[22.5rem] md:h-[100%] md:w-[58%]">
          <Image
            fill
            src={notice.shop.item.imageUrl}
            alt="매장 이미지"
            sizes="(max-width: 640px) 58% 100%"
            unoptimized={true}
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-8 pt-4 md:h-[100%] md:w-[38%] md:justify-between">
          <div className="flex flex-col gap-1 sm:gap-2">
            <span className="category">시급</span>
            <div className="flex items-center gap-3">
              <h4 className="text-2xl font-semibold text-black sm:text-[1.75rem]">
                {`${Number(notice.hourlyPay).toLocaleString()}원`}
              </h4>
              <HigherAverageBadge hourlyPay={notice.hourlyPay} closed={notice.closed} />
            </div>
            <div className="my-2 flex flex-col gap-2">
              <Information
                fontSize="text-sm sm:text-base"
                textColor="text-gray-50"
                name="시간"
                value={date}
                imageSrc="/my-shop/clock.svg"
              />
              <Information
                fontSize="text-sm sm:text-base"
                textColor="text-gray-50"
                name="위치"
                value={notice.shop.item.address1}
                imageSrc="/my-shop/location.svg"
              />
            </div>
            <p className="max-h-[23.75rem] w-[100%] text-sm text-black sm:text-base">
              {notice.shop.item.description
                ? notice.shop.item.description
                : '등록된 설명이 없습니다.'}
            </p>
          </div>
          <Button className="h-12 w-full" variant="reverse">
            <Link href={`/owner/my-shop/notice/${notice.id}/edit`}>공고 편집하기</Link>
          </Button>
        </div>
      </div>
      <div className="mt-6 w-full rounded-lg bg-gray-10 p-8">
        <h5 className="mb-3 font-semibold text-black">공고 설명</h5>
        <p className="text-black">
          {notice.description ? notice.description : '등록된 설명이 없습니다.'}
        </p>
      </div>
    </>
  );
}
