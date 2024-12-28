'use client';
import { PaginationProps } from '@/app/types/Notice';

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className = '',
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageRangeDisplayed = 7;

  const startPage = Math.floor((currentPage - 1) / pageRangeDisplayed) * pageRangeDisplayed + 1;
  const endPage = Math.min(startPage + pageRangeDisplayed - 1, totalPages);

  const movePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const arrowButtonClass =
    'flex h-5 w-5 items-center justify-center text-gray-black disabled:text-gray-40';

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-4 ${className}`}>
      <button
        disabled={currentPage === 1}
        className={arrowButtonClass}
        onClick={() => movePage(currentPage - 1)}
      >
        &lt;
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const pageNumber = startPage + index;
        return (
          <button
            key={pageNumber}
            onClick={() => movePage(pageNumber)}
            className={`flex h-8 w-8 items-center justify-center rounded-[4px] text-xs sm:text-sm ${
              currentPage === pageNumber
                ? 'bg-red-30 text-white'
                : 'text-gray-black hover:bg-gray-10'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        className={arrowButtonClass}
        onClick={() => movePage(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
