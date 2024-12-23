import { Notice, Shop } from '@/app/types/Shop';
import converDate from '@/app/utils/converDate';
import formatTimeRange from '@/app/utils/formatTimeRange';
import HigherAverageBadge from '@/app/components/my-shop/HigherAverageBadge';
import Information from './Information';
import Link from 'next/link';
import calculateAverageHourlyPay from '@/app/utils/calculateAverageHourlyPay';

export default function NoticeCard({
  not,
  shop,
  notice,
  closed,
}: {
  not: Notice;
  shop: Shop;
  notice: Notice[];
  closed: boolean;
}) {
  const color = {
    text: {
      black: closed ? 'text-gray-30' : 'text-black',
      gray: closed ? 'text-gray-30' : 'text-gray-50',
    },
  };

  const averageHourlyPay = calculateAverageHourlyPay(notice);

  return (
    <Link href={`/owner/my-shop/notice/${not.item.id}`}>
      <div className="h-[22rem] rounded-xl border p-4">
        {closed && (
          <div className="relative">
            <div className="absolute flex h-[10rem] w-full items-center justify-center rounded-xl bg-black opacity-70">
              <span className="text-2xl font-semibold text-gray-30">마감 완료</span>
            </div>
          </div>
        )}
        <div className="flex h-[10rem] items-center justify-center rounded-xl bg-gray-20">
          <span>리스폰스에 이미지 없음</span>
        </div>
        <div className="mt-5 flex h-[42%] flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h5 className={`text-base font-medium ${color.text.black} sm:text-xl`}>{shop.name}</h5>
            <Information
              fontSize="text-xs sm:text-sm"
              textColor={color.text.gray}
              name="시간"
              value={`${converDate(not.item.startsAt)} ${formatTimeRange(not.item.startsAt, not.item.workhour)}`}
              imageSrc={closed ? '/my-shop/closeClock.svg' : '/my-shop/clock.svg'}
            />
            <div className="ml-[-1.8px] sm:m-0">
              <Information
                fontSize="text-xs sm:text-sm"
                textColor={color.text.gray}
                name="위치"
                value={shop?.address1}
                imageSrc={closed ? '/my-shop/closeLocation.svg' : '/my-shop/location.svg'}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between pt-[0.6rem] sm:flex-row sm:items-center">
            <span className={`text-lg font-semibold ${color.text.black} sm:text-2xl`}>
              {`${not.item.hourlyPay.toLocaleString()}원`}
            </span>
            <HigherAverageBadge
              originalHourlyPay={averageHourlyPay}
              hourlyPay={not.item.hourlyPay}
              closed={closed}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
