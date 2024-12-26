import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-black">404</h1>
        <p className="mt-4 text-2xl text-gray-600">페이지를 찾을 수 없습니다.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded bg-orange px-4 py-2 text-white hover:bg-red-40"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
