// 알바님 레이아웃
import React, { ReactNode } from 'react';

interface LayoutWrapperProps {
  children: ReactNode;
  className?: string;
}

const LayoutWrapper = ({ children, className = '' }: LayoutWrapperProps) => {
  return (
    <div className={`px-3 py-10 sm:px-8 sm:py-[3.75rem] lg:px-0 ${className}`}>
      <div className="mx-auto max-w-[964px]">{children}</div>
    </div>
  );
};

export default LayoutWrapper;
