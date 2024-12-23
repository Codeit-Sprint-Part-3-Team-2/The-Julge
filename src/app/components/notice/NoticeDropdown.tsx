'use client';

import React, { useState } from 'react';

const NoticeDropdown: React.FC<{ onChange: (sortOption: string) => void }> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('마감임박순');

  const menuItems = ['마감임박순', '시급많은순', '시간적은순', '가나다순'];

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    onChange(item);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-[105px] items-center justify-center rounded-md bg-gray-10 text-sm font-bold text-gray-black hover:bg-gray-200 focus:outline-none"
      >
        {selectedItem}
        <span className="ml-2 text-[10px]">▼</span>
      </button>

      {isOpen && (
        <ul className="absolute left-0 z-50 mt-2 w-[105px] rounded-md border border-gray-20 bg-gray-white shadow-lg">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`block h-8 w-full text-center text-sm text-gray-black hover:bg-gray-100 ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-20' : ''
                }`}
                onClick={() => handleSelectItem(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoticeDropdown;
