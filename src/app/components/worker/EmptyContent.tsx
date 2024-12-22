import React from 'react';
import Button from '../common/Button';

interface EmptyContentProps {
  title: string;
  content: string;
  buttonText: string;
  onButtonClick?: () => void;
}
// 데이터 없을 경우
const EmptyContent = ({ title, content, buttonText, onButtonClick }: EmptyContentProps) => {
  return (
    <>
      <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-[1.75rem]">{title}</h2>
      <div className="flex flex-col items-center rounded-xl border border-gray-20 px-6 py-10">
        <p className="mb-4 text-sm sm:mb-6 sm:text-base">{content}</p>
        <Button className="w-36 p-[0.625rem] sm:w-80 sm:p-3" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </>
  );
};

export default EmptyContent;
