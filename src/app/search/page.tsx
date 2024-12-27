'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const SearchContent = dynamic(() => import('./SearchContent'), { ssr: false });

export default function SearchPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SearchContent />
    </Suspense>
  );
}
