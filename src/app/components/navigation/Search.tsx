'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Search = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('가게 이름을 입력해주세요');
    } else {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex items-center gap-2 rounded-[0.625rem] bg-gray-10 p-2 sm:gap-[0.625rem] sm:p-[0.625rem]">
        <div className="relative size-4 sm:size-5">
          <Image src="/header/ic-search.svg" alt="검색" fill className="object-contain" />
        </div>
        <input
          type="text"
          placeholder="가게 이름으로 찾아보세요"
          className="w-full bg-transparent text-xs placeholder:text-gray-40 focus:outline-none sm:text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Search;
