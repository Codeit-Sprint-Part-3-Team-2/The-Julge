'use client';
import Image from 'next/image';
import { useState } from 'react';

type DropDownBtnProps = {
  id?: string;
  categories?: string[]; // 카테고리 목록
  selectedCategory?: string; // 선택된 카테고리
  onSelectCategory: (category: string) => void; // 카테고리 선택 시 부모로 값 전달
  required?: boolean;
  className?: string;
};

export default function DropDownBtn({
  id,
  categories = [],
  selectedCategory,
  onSelectCategory,
  required = false,
  className = '',
}: DropDownBtnProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <input
          className={`${className} w-full cursor-pointer rounded-md border border-gray-30 py-4 pl-5 text-base font-normal text-gray-black`}
          type="text"
          id={id}
          name="Category"
          placeholder="선택"
          value={selectedCategory || ''} // 선택된 카테고리 값
          onClick={() => setVisible(!visible)}
          readOnly
          required={required}
        />
        <div className="absolute right-5 top-1/2 z-10 -translate-y-1/2 cursor-pointer">
          <div
            className={`h-auto w-full max-w-3.5 origin-center transition-transform duration-300 ${visible ? 'rotate-180' : ''}`}
          >
            <Image
              className="object-contain"
              src="/shop-icons/down-btn.png"
              alt="다운아이콘"
              width={14}
              height={9}
            />
          </div>
        </div>
      </div>
      <ul
        className={`absolute top-16 z-20 w-full overflow-y-scroll rounded-md transition-all duration-300 ease-out custom-scrollbar ${
          visible
            ? 'max-h-60 border border-gray-30 bg-gray-white'
            : 'max-h-0 border border-transparent bg-transparent'
        }`}
      >
        {categories.map((category, index) => (
          <li
            className={`w-full cursor-pointer border-b border-b-gray-30 py-3 text-center ${
              index === categories.length - 1 ? 'border-b-0' : ''
            }`}
            key={index}
            onClick={() => {
              onSelectCategory(category);
              setVisible(false);
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
