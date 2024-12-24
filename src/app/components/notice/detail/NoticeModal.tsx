import React from 'react';
import Button from '../../common/Button';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  variant?: 'alert' | 'confirm';
}

const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  content,
  confirmText = '확인',
  cancelText = '아니요',
  onConfirm,
  onCancel,
  variant = 'alert',
}) => {
  if (!isOpen) return null;

  const icon = variant === 'alert' ? '!' : '✔';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="h-[184px] w-[298px] rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-5 flex justify-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange">
            <span className="text-lg font-bold text-white">{icon}</span>
          </div>
        </div>
        <div className="text-center text-base text-gray-black">{content}</div>
        <div className="mt-6 flex justify-center space-x-4">
          {variant === 'confirm' && (
            <Button
              variant="primary"
              onClick={onCancel}
              className="w-28 border border-gray-300 text-gray-black"
            >
              {cancelText}
            </Button>
          )}
          <Button variant="reverse" onClick={onConfirm || onClose} className="h-[38px] w-20">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
