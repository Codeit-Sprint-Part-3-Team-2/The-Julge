'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  image: string;
  title: string;
  date: string;
  hours: string;
  location: string;
  price: string;
  discount?: string;
  noticeId: string;
  shopId: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  date,
  hours,
  location,
  price,
  discount,
  noticeId,
  shopId,
  onClick,
}) => {
  const discountValue = discount ? parseInt(discount.match(/\d+/)?.[0] || '0', 10) : 0;
  const discountClass =
    discountValue >= 50
      ? 'text-red-40 sm:bg-red-40 sm:text-white'
      : discountValue >= 30
        ? 'text-red-40 sm:bg-red-30 sm:text-white'
        : 'text-red-40 sm:bg-red-20 sm:text-white';

  return (
    <Link href={`/${shopId}/${noticeId}`} onClick={onClick}>
      <div className="w-44 rounded-xl border border-gray-20 bg-white p-4 sm:w-[312px]">
        <div className="relative h-20 w-full sm:h-40">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="rounded-xl object-cover"
          />
        </div>

        <div className="mt-4">
          <h3 className="text-base font-bold text-gray-black sm:text-xl">{title}</h3>

          <div className="mt-2 flex items-start gap-1">
            <Image
              src="/images/clock-icon.svg"
              alt="시계"
              width={16}
              height={16}
              className="object-contain sm:h-5 sm:w-5"
            />
            <div className="flex flex-wrap text-xs text-gray-50 sm:text-sm">
              <p className="mr-2">{date}</p>
              <p>{hours}</p>
            </div>
          </div>
          <div className="mt-2 flex gap-1">
            <Image
              src="/images/location.svg"
              alt="위치"
              width={16}
              height={16}
              className="object-contain sm:h-5 sm:w-5"
            />
            <p className="text-xs text-gray-50 sm:text-sm">{location}</p>
          </div>

          <div className="mt-3 flex flex-wrap items-center sm:mt-2 sm:gap-3">
            <span className="text-lg font-bold text-gray-black sm:text-2xl">{price}</span>
            {discount && (
              <span
                className={`flex items-center justify-center text-center text-xs sm:h-9 sm:w-40 sm:rounded-3xl sm:text-sm ${discountClass}`}
                aria-label={`할인율: ${discount}`}
              >
                {discount} 🡅
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
