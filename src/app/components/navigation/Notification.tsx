import { useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getUserNotifications, markNotification } from '@/app/api/api';
import Image from 'next/image';
import { NotificationItem } from './Header';

interface NotificationProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  token: string;
  userId: string;
  notifications?: NotificationItem[];
  setNotifications: (notifications: NotificationItem[]) => void;
}

const Notification = ({
  isModalOpen,
  toggleModal,
  token,
  userId,
  notifications,
  setNotifications,
}: NotificationProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const fetchNotifications = async () => {
      if (token && userId) {
        try {
          const res = await getUserNotifications(token, userId, 0, 20);
          setNotifications(res.item || []);
        } catch (error) {
          console.error('알림 가져오기 실패:', error);
        }
      }
    };

    if (isModalOpen) {
      fetchNotifications();
    }
  }, [isModalOpen, token, userId, setNotifications,]);

  // 시간 포맷팅
  const formatTimeAgo = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: ko });
  };

  // 알림 읽음 처리
  const handleMarkAsRead = async (alertId: string) => {
    try {
      await markNotification(token, userId, alertId);
       if (!notifications) return;
      const updatedNotifications = notifications.map((notification) =>
        notification.id === alertId
          ? { ...notification, status: 'read' }
          : notification
      );
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
    }
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
            <div className="text-[1.25rem] font-bold">알림 {notifications?.length}개</div>
            <button onClick={toggleModal} className="relative size-6 sm:hidden">
              <Image src="/header/ic-close.svg" alt="닫기" fill className="object-contain" />
            </button>
          </div>
          <ul className="flex h-[93%] flex-col gap-2 overflow-y-auto custom-scrollbar sm:h-auto sm:max-h-96">
            {notifications?.length === 0 ? (
              <li className="py-16 text-center text-gray-50">알림이 없습니다.</li>
            ) : (
              notifications?.map((notification: NotificationItem) => (
                <li
                  key={notification.id}
                  className="rounded-md border border-gray-20 bg-white px-3 py-4"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div
                    className={`size-[5px] rounded-full ${
                      notification.status === 'approved' ? 'bg-blue-20' : 'bg-red-40'
                    }`}
                  ></div>
                  <div className="my-1">
                    {notification.storeName} ({notification.period}) 공고 지원이{' '}
                    <span
                      className={
                        notification.status === 'approved' ? 'text-blue-20' : 'text-red-40'
                      }
                    >
                      {notification.status === 'approved' ? '승인' : '거절'}
                    </span>
                    되었어요.
                  </div>
                  <div className="text-xs text-gray-40">
                    {formatTimeAgo(notification.timestamp)}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notification;
