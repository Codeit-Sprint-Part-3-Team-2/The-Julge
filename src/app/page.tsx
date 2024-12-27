'use client';

import React, { useState } from 'react';
import AllNotices from './components/notice/AllNotices';
import CustomNotices from './components/notice/CustomNotices';
import DetailedFilter from './components/notice/DetailedFilter';
import NoticeDropdown from './components/notice/NoticeDropdown';
import Pagination from './components/notice/Pagination';
import formatSortToApi from './utils/formatSortToApi';

const container = 'mx-auto px-4 sm:px-8 lg:px-0 pb-4 max-w-[964px] pt-10 sm:pb-4 lg:pb-14';

export default function Posts() {
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
      <div className="bg-red-10">
        <div className={`sm:pt-14 ${container}`}>
          <h2 className="mb-5 text-xl font-bold text-gray-black sm:text-[28px]">맞춤 공고</h2>
          <CustomNotices />
        </div>
      </div>

      <div className={`${container} mb-8 flex flex-col lg:mb-0`}>
        <div className={`mb-5 sm:flex sm:items-center sm:justify-between`}>
          <h2 className="text-xl font-bold text-gray-black sm:text-[28px]">전체 공고</h2>
          <div className="mt-12 flex items-center gap-3">
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
