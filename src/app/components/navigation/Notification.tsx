import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface NotificationProps {
  isModalOpen: boolean;
  toggleModal: () => void;
}

interface NotificationItem {
  id: string;
  storeName: string;
  period: string;
  status: string;
  timestamp: string; // ISO 형식 시간 (예: 2024-01-14T15:00:00Z)
}

const Notification = ({ isModalOpen, toggleModal }: NotificationProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        toggleModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, toggleModal]);

  // 임시 데이터 사용
  useEffect(() => {
    const notificationData = () => {
      const tempNotifications = [
        {
          id: '1',
          storeName: 'HS 과일주스',
          period: '2024-12-14 15:00~18:00',
          status: 'approved',
          timestamp: '2024-12-14T15:00:00Z',
        },
        {
          id: '2',
          storeName: '써니브런치 레스토랑',
          period: '2024-12-14 15:00~18:00',
          status: 'rejected',
          timestamp: '2024-12-13T12:00:00Z',
        },
        {
          id: '3',
          storeName: '수리 에스프레소 샵',
          period: '2024-12-15 13:00~16:00',
          status: 'approved',
          timestamp: '2024-12-14T15:00:00Z',
        },
        {
          id: '4',
          storeName: '꼬꼬치킨',
          period: '2024-12-15 13:00~16:00',
          status: 'approved',
          timestamp: '2024-12-14T15:00:00Z',
        },
        {
          id: '5',
          storeName: '꼬꼬치킨',
          period: '2024-12-15 13:00~16:00',
          status: 'approved',
          timestamp: '2024-12-14T15:00:00Z',
        },
        {
          id: '6',
          storeName: '꼬꼬치킨',
          period: '2024-12-15 13:00~16:00',
          status: 'approved',
          timestamp: '2024-12-14T15:00:00Z',
        },
      ];

      setNotifications(tempNotifications);
    };

    if (isModalOpen) {
      notificationData();
    }
  }, [isModalOpen]);

  // 시간 포맷팅
  const formatTimeAgo = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: ko });
  };

  if (!isModalOpen) return null;

  return (
    <div className="absolute left-0 top-0 size-full h-dvh">
      <div className="absolute left-1/2 top-0 size-full max-w-5xl -translate-x-1/2 transform">
        <div
          ref={modalRef}
          className="absolute inset-x-0 size-full bg-red-10 p-6 px-5 py-10 sm:left-auto sm:top-14 sm:mr-8 sm:h-auto sm:w-96 sm:rounded-[0.625rem] sm:border-gray-30 sm:py-6 sm:shadow-[0_2px_8px_rgba(120,_116,_134,_0.25)] lg:mr-0"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[1.25rem] font-bold">알림 {notifications.length}개</div>
            <button onClick={toggleModal} className="relative size-6 sm:hidden">
              <Image src="/header/ic-close.svg" alt="닫기" fill className="object-contain" />
            </button>
          </div>
          <ul className="custom-scrollbar flex h-[93%] flex-col gap-2 overflow-y-auto sm:h-auto sm:max-h-96">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="rounded-md border border-gray-20 bg-white px-3 py-4"
              >
                <div
                  className={`size-[5px] rounded-full ${
                    notification.status === 'approved' ? 'bg-blue-20' : 'bg-red-40'
                  }`}
                ></div>
                <div className="my-1">
                  {notification.storeName} ({notification.period}) 공고 지원이{' '}
                  <span
                    className={notification.status === 'approved' ? 'text-blue-20' : 'text-red-40'}
                  >
                    {notification.status === 'approved' ? '승인' : '거절'}
                  </span>
                  되었어요.
                </div>
                <div className="text-xs text-gray-40">{formatTimeAgo(notification.timestamp)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notification;
