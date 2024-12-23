'use client';

import React, { useState } from 'react';
import { LOCATION_LIST } from '../../constants/location';

const inputClass =
  'h-14 w-full rounded-md border border-gray-30 px-4 py-1 text-gray-black focus:outline-none focus:ring';

const toggleLocation = (selectedLocations: string[], location: string): string[] => {
  return selectedLocations.includes(location)
    ? selectedLocations.filter((item) => item !== location)
    : [...selectedLocations, location];
};

const calculateFilterCount = (
  selectedLocations: string[],
  startDate: string,
  amount: string
): number => {
  return selectedLocations.length + (startDate ? 1 : 0) + (amount ? 1 : 0);
};

const DetailedFilter: React.FC<{
  onFilterChange: (filters: { locations: string[]; startDate: string; amount: string }) => void;
}> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const resetFilters = () => {
    setSelectedLocations([]);
    setStartDate('');
    setAmount('');
  };

  const filterCount = calculateFilterCount(selectedLocations, startDate, amount);

  const handleApplyFilters = () => {
    onFilterChange({
      locations: selectedLocations,
      startDate: startDate,
      amount: amount,
    });
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[30px] min-w-20 items-center justify-center rounded-md bg-red-30 px-4 py-2 font-bold text-white"
      >
        상세 필터 {filterCount > 0 && `(${filterCount})`}
      </button>

      {isOpen && (
        <div className="fixed left-0 top-0 z-50 h-full w-full bg-white p-6 sm:absolute sm:left-auto sm:right-[2px] sm:top-auto sm:mt-3 sm:h-auto sm:w-96 sm:rounded-lg sm:border sm:border-gray-20 sm:shadow-lg">
          <div className="mb-4 flex items-center justify-between text-gray-black">
            <h2 className="text-xl font-bold">상세 필터</h2>
            <button onClick={() => setIsOpen(false)} className="text-2xl">
              ✕
            </button>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-base">위치</h3>
            <div className="grid max-h-48 grid-cols-2 gap-2 overflow-auto rounded-md border p-3 custom-scrollbar">
              {LOCATION_LIST.map((location) => (
                <button
                  key={location}
                  onClick={() => setSelectedLocations(toggleLocation(selectedLocations, location))}
                  className="rounded-md px-2 py-1 text-left text-sm text-gray-black"
                >
                  {location}
                </button>
              ))}
            </div>

            {selectedLocations.length > 0 && (
              <div className="mb-6 mt-2 flex flex-wrap gap-2">
                {selectedLocations.map((location) => (
                  <span
                    key={location}
                    className="flex items-center rounded-full bg-red-10 px-2 py-1 text-sm font-bold text-orange"
                  >
                    {location}
                    <button
                      onClick={() =>
                        setSelectedLocations(toggleLocation(selectedLocations, location))
                      }
                      className="ml-2 text-orange hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4 border-b-2 border-t-2 border-gray-10 pb-5 pt-5">
            <h3 className="mb-2 text-base font-normal text-gray-black">시작일</h3>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="mb-4 text-base">
            <h3 className="mb-2 mt-2 font-normal text-gray-black">금액</h3>
            <div className="flex items-center gap-2">
              <div className="relative w-[45%]">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`${inputClass} pr-10 no-spinner`}
                  placeholder="입력"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-black">
                  원
                </span>
              </div>
              <span className="text-gray-black">이상부터</span>
            </div>
          </div>

          <div className="flex justify-between text-base font-bold text-orange">
            <button
              onClick={resetFilters}
              className="w-[27%] rounded-md border border-orange px-4 py-2"
            >
              초기화
            </button>
            <button
              onClick={handleApplyFilters}
              className="w-[67%] rounded-md bg-orange px-4 py-2 text-white"
            >
              적용하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedFilter;
