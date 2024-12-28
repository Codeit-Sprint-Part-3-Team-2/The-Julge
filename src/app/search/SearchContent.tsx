'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AllNotices from '../components/notice/AllNotices';
import DetailedFilter from '../components/notice/DetailedFilter';
import NoticeDropdown from '../components/notice/NoticeDropdown';
import Pagination from '../components/notice/Pagination';
import formatSortToApi from '../utils/formatSortToApi';

const container = 'mx-auto px-4 sm:px-8 lg:px-0 pb-4 max-w-[964px] pt-10 sm:pb-4 lg:pb-14';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOption, setSortOption] = useState('마감임박순');

  const [filterOptions, setFilterOptions] = useState<{
    locations: string[];
    startDate: string;
    amount: string;
  }>({
    locations: [],
    startDate: '',
    amount: '',
  });

  const itemsPerPage = 6;

  const handleFilterChange = (filters: {
    locations: string[];
    startDate: string;
    amount: string;
  }) => {
    setFilterOptions(filters);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className={`${container} mb-8 flex min-h-[300px] flex-col lg:mb-0`}>
        <div className={`mb-5 sm:flex sm:items-center sm:justify-between`}>
          <h2 className="text-xl font-bold text-gray-black sm:text-[28px]">
            <span className="text-orange">{query}</span>에 대한 공고 목록
          </h2>
          <div className="mt-4 flex items-center gap-3 sm:mt-0">
            <NoticeDropdown
              onChange={(selectedSort) => {
                setSortOption(selectedSort);
                setCurrentPage(1);
              }}
            />
            <DetailedFilter onFilterChange={handleFilterChange} />
          </div>
        </div>
        <AllNotices
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setTotalItems={setTotalItems}
          sortOption={formatSortToApi(sortOption)}
          filterOptions={filterOptions}
          query={query}
        />
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        className="mb-16"
      />
    </div>
  );
}
