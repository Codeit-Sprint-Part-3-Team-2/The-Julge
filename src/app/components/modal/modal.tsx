import React from 'react';
import Button from '../common/Button';

interface ModalProps {
  isOpen: boolean; // 모달 열림 상태
  onClose: () => void; // 모달 닫기 함수
  children: React.ReactNode; // 모달 내부에 표시할 콘텐츠
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-black bg-opacity-60">
      <div className="mx-6 flex h-[220px] w-[327px] flex-col rounded-lg bg-gray-white p-6 shadow-lg sm:mx-6 md:mx-8 md:h-[250px] md:w-[540px] lg:mx-10 lg:max-w-[540px]">
        {/* 모달 콘텐츠 */}
        <div className="flex flex-1 items-center justify-center text-center text-base text-gray-800 sm:text-lg">
          {children}
        </div>

        {/* 확인 버튼 */}
        <div className="mt-auto flex justify-center sm:justify-end">
          <Button
            onClick={onClose} // 모달 닫기 이벤트
            className="w-28 rounded-md bg-orange py-2 text-white hover:bg-opacity-90"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
