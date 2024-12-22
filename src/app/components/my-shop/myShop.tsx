import Image from 'next/image';
import Button from '@/app/components/common/Button';
import { Shop } from '@/app/types/Shop';
import Information from './Information';
import Link from 'next/link';

export default function MyShop({ shop }: { shop: Shop }) {
  return (
    <>
      <div className="flex w-full flex-col rounded-xl bg-red-10 p-6 md:h-[22.25rem] md:flex-row md:items-center md:gap-8">
        <div className="relative h-[11rem] w-full overflow-hidden rounded-xl sm:h-[22.5rem] md:h-[100%] md:w-[58%]">
          <Image
            fill
            src={shop.imageUrl}
            alt="매장 이미지"
            sizes="(max-width: 640px) 58% 100%"
            unoptimized={true}
            className="object-cover"
          />
        </div>
        <div className="flex w-[38%] flex-col gap-8 pt-4 md:h-[100%] md:justify-between">
          <div className="flex flex-col gap-1 sm:gap-2">
            <span className="label">{shop.category}</span>
            <h4 className="text-2xl font-semibold text-black sm:text-[1.75rem]">{shop.name}</h4>
            <div className="my-2">
              <Information
                fontSize="text-sm sm:text-base"
                textColor="text-gray-50"
                name="위치"
                value={shop.address1}
                imageSrc="/my-shop/location.svg"
              />
            </div>
            <p className="max-h-[23.75rem] w-[100%] text-sm text-black sm:text-base">
              {shop.description}
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="h-12 w-[50%] md:w-[10.5rem]" variant="reverse">
              <Link href="/owner/my-shop/register">편집하기</Link>
            </Button>
            <Button className="h-12 w-[50%] md:w-[10.5rem]" variant="primary">
              <Link href="/owner/my-shop/notice/register">공고 등록하기</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}