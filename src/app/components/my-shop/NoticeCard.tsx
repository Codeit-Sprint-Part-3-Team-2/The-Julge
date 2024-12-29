import { Notice, Shop } from '@/app/types/Shop';
import converDate from '@/app/utils/converDate';
import formatTimeRange from '@/app/utils/formatTimeRange';
import HigherAverageBadge from '@/app/components/my-shop/HigherAverageBadge';
import Information from './Information';
import Link from 'next/link';
import Image from 'next/image';

interface NoticeItem {
  item: Notice;
  links: [];
}

export default function NoticeCard({
  not,
  shop,
  closed,
}: {
  not: NoticeItem;
  shop: Shop;
  closed: boolean;
}) {
  const color = {
    text: {
      black: closed ? 'text-gray-30' : 'text-black',
      gray: closed ? 'text-gray-30' : 'text-gray-50',
    },
  };

  return (
    <Link href={`/owner/my-shop/notice/${not.item.id}`}>
      <div className="h-[22rem] rounded-xl border p-4">
        <div className="relative flex h-[10rem] items-center justify-center overflow-hidden rounded-xl bg-gray-20">
          {closed && (
            <div className="absolute z-50 flex h-[10rem] w-full items-center justify-center rounded-xl bg-black opacity-70">
              <span className="text-2xl font-semibold text-gray-30">마감 완료</span>
            </div>
          )}
          <Image fill src={shop.imageUrl} alt="매장 이미지" sizes="(max-width: 640px) 100%" />
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
              {`${Number(not.item.hourlyPay).toLocaleString()}원`}
            </span>
            <HigherAverageBadge hourlyPay={not.item.hourlyPay} closed={closed} />
          </div>
        </div>
      </div>
    </Link>
  );
}
