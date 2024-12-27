import Image from 'next/image';
import { hourPayComparisom } from '@/app/utils/hourPayComparison';

const originalHourlyPay = 10000;

export default function HigherAverageBadge({
  hourlyPay,
  closed = false,
}: {
  hourlyPay: number;
  closed?: boolean;
}) {
  const color = {
    badge: {
      bg: closed ? 'sm:bg-gray-30' : 'sm:bg-orange',
      text: closed ? 'text-gray-30 sm:text-white' : 'text-orange sm:text-white',
    },
  };

  const { isHigherThanAverage, percentageDifference } = hourPayComparisom(
    originalHourlyPay,
    hourlyPay
  );

  if (!isHigherThanAverage) return null;

  return (
    <>
      <div
        className={`flex items-center gap-1 rounded-full ${color.badge.bg} sm:gap-2 sm:px-3 sm:py-2`}
      >
        <span className={`${color.badge.text} text-xs sm:text-sm sm:text-white`}>
          기존 시급의 {percentageDifference.toFixed(0)}%
        </span>
        <div className="relative hidden h-5 w-4 sm:block">
          <Image fill src="/my-shop/arrow-up.svg" alt="상승" sizes="(max-width: 640px) 16px" />
        </div>
        <div className="relative block h-5 w-4 sm:hidden">
          <Image fill src="/my-shop/m-arrow-up.svg" alt="상승" sizes="(max-width: 640px) 16px" />
        </div>
      </div>
    </>
  );
}
