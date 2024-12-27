import Pagination from 'react-js-pagination';
import Image from 'next/image';

// pagination ver 2, 공용 컴포넌트에 없어서 추가
export default function PageNav({
  page,
  limit,
  totalCount,
  onChange,
}: {
  page: number;
  limit: number;
  totalCount: number;
  onChange: (page: number) => void;
}) {
  // 리스폰스로 오는 hasNext가 다 true 라서 일단 count/limit <= pageNumber로 계산
  const handlePageIcon = (page: number, arrow: 'left' | 'right') => {
    const isDisabledLeft = page === 1;
    const isDisabledRight = totalCount / limit <= page;

    const iconSrc =
      arrow === 'left'
        ? isDisabledLeft
          ? '/my-shop/chevron-left-disabled.svg'
          : '/my-shop/chevron-left.svg'
        : isDisabledRight
          ? '/my-shop/chevron-right-disabled.svg'
          : '/my-shop/chevron-right.svg';

    return (
      <div className="relative h-5 w-5">
        <Image fill src={iconSrc} alt="왼쪽" sizes="(max-width: 640px) 20px" />
      </div>
    );
  };

  return (
    <>
      <Pagination
        activePage={page}
        itemsCountPerPage={limit}
        totalItemsCount={totalCount}
        onChange={onChange}
        pageRangeDisplayed={7}
        prevPageText={handlePageIcon(page, 'left')}
        nextPageText={handlePageIcon(page, 'right')}
        firstPageText={''}
        lastPageText={''}
        innerClass="flex justify-center my-5 gap-1"
        itemClass="w-10 h-10 flex items-center justify-center font-normal text-sm"
        activeClass="bg-red-30 rounded-lg text-white"
      />
    </>
  );
}
