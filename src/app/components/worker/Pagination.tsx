// 신청내역 페이지네이션
import Image from 'next/image';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ currentPage, totalPages, paginate }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-5 py-3">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative size-5 disabled:opacity-[0.37]"
      >
        <Image src="/worker/ic-arrow-active.svg" alt="이전" fill className="object-contain" />
      </button>

      <div className="flex gap-[2px]">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number}
            onClick={() => paginate(number + 1)}
            className={`size-10 ${currentPage === number + 1 ? 'rounded-[0.25rem] bg-red-30 text-white' : 'bg-inherit'}`}
          >
            {number + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="relative size-5 disabled:opacity-[0.37]"
      >
        <Image
          src="/worker/ic-arrow-active.svg"
          alt="다음"
          fill
          className="rotate-180 transform object-contain"
        />
      </button>
    </div>
  );
};

export default Pagination;
