import SkeletonBox from './skeleton-box';

const ShopFormSkeleton: React.FC = () => {
  return (
    <section className="w-full bg-gray-5 px-3 pb-20 pt-10 md:px-8 md:pb-[3.75rem] md:pt-[3.75rem] xl:px-60">
      <div className="mb-6 flex w-full items-center justify-between">
        <SkeletonBox height={7} width="1/4" />
        <SkeletonBox height={4} width={4} />
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-6 md:w-full md:flex-row md:gap-5">
          <div className="flex flex-col gap-2 md:w-1/2">
            <SkeletonBox height={5} width="1/4" />
            <SkeletonBox height={12} width="full" />
          </div>
          <div className="flex flex-col gap-2 md:w-1/2">
            <SkeletonBox height={5} width="1/4" />
            <SkeletonBox height={12} width="full" />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:w-full md:flex-row md:gap-5">
          <div className="flex flex-col gap-2 md:w-1/2">
            <SkeletonBox height={5} width="1/4" />
            <SkeletonBox height={12} width="full" />
          </div>
          <div className="flex flex-col gap-2 md:w-1/2">
            <SkeletonBox height={5} width="1/4" />
            <SkeletonBox height={12} width="full" />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:w-[49%]">
          <SkeletonBox height={5} width="1/4" />
          <SkeletonBox height={12} width="full" />
        </div>
        <div className="flex flex-col gap-2 md:max-w-[30.1875rem]">
          <SkeletonBox height={5} width="1/4" />
          <SkeletonBox height={52} width="full" className="md:h-72" />
        </div>
        <div className="flex flex-col gap-2">
          <SkeletonBox height={5} width="1/4" />
          <SkeletonBox height={32} width="full" className="md:h-40" />
        </div>
        <SkeletonBox height={12} width="full" className="md:mx-auto md:max-w-[19.5rem]" />
      </div>
    </section>
  );
};

export default ShopFormSkeleton;
