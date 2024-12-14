import Link from 'next/link';
export default function MyShopPage() {
  return (
    <section className="w-full px-[12px] pt-[142px] md:px-[32px] md:pt-[130px] xl:px-[237px]">
      <h3 className="mb-[16px] text-[20px] font-bold md:mb-[24px] md:text-[28px]">내 가게</h3>
      <div className="w-full rounded-[12px] border border-gray-20">
        <div className="flex flex-col items-center gap-[16px] px-[24px] py-[60px] md:gap-[24px]">
          <p className="text-[14px] font-[400] md:text-[16px]">
            내 가게를 소개하고 공고도 등록해 보세요.
          </p>
          <Link
            className="bg-orange flex h-[37px] w-full max-w-[108px] items-center justify-center rounded-[6px] md:h-[47px] md:max-w-[346px]"
            href={'/register'}
          >
            <span className="text-[14px] text-gray-white md:text-[16px]">가게 등록하기</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
