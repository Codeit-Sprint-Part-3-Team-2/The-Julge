'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Search from './Search';
import Notification from './Notification';
import useModalState from '@/app/hooks/useModalState';
import useAuthStore from '@/app/stores/authStore';
import { useRouter } from 'next/navigation';
import { getUserNotifications, markNotification } from '@/app/api/api';

interface HeaderProps {
  hiddenPaths: string[];
}

export interface NotificationItem {
  id: string;
  storeName: string;
  period: string;
  status: string;
  timestamp: string;
}

const Header = ({ hiddenPaths }: HeaderProps) => {
  const { user, type, token, logout } = useAuthStore();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { isModalOpen, toggleModal } = useModalState();

  const pathname = usePathname();
  const hiddenHeader = hiddenPaths.some((path) => pathname.startsWith(path));
  const router = useRouter();

  // 알림 목록 가져오기
  const fetchNotifications = useCallback(async () => {
    if (token && user) {
      try {
        const response = await getUserNotifications(token, user.id, 0, 20);
        setNotifications(response.item || []);
      } catch (error) {
        console.error('알림 가져오기 실패:', error);
      }
    }
  }, [token, user]);

  // 알림 아이콘 클릭 시
  const handleNotificationClick = async () => {
    if (!token || !user) return;
    try {
      if (notifications.length > 0) {
        // 모든 알림 읽음 처리
        for (const notification of notifications) {
          await markNotification(token, user.id, notification.id);
        }
        const updatedNotifications = notifications.map((notification) => ({
          ...notification,
          status: 'read',
        }));
        setNotifications(updatedNotifications);
      }
    } catch (error) {
      console.error('모든 알림 읽음 처리 실패:', error);
    }

    toggleModal();
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchNotifications();
    }
  }, [isModalOpen, fetchNotifications]);

  // 로그아웃
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
      alert('로그아웃 되었습니다.');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  if (hiddenHeader) return null;

  return (
    <header className="sticky inset-x-0 top-0 z-30 bg-white px-5 py-2.5 text-sm text-gray-black sm:px-8 sm:py-4 sm:text-base lg:px-0">
      <div className="mx-auto flex items-center justify-between lg:max-w-5xl">
        <div className="mr-6 flex max-w-[602px] gap-8 sm:w-full md:gap-10">
          <h1 className="h-7 w-20 shrink-0 sm:h-10 sm:w-28">
            <Link href="/" className="relative block size-full">
              <Image src="/header/logo.svg" alt="The-Julge" fill className="object-contain" />
            </Link>
          </h1>

          {/* 데스크탑 검색창 */}
          <div className="hidden w-full sm:block">
            <Search />
          </div>
        </div>

        {/* 우측 메뉴 */}
        <div className="shrink-0 font-bold">
          {!token ? (
            <div className="flex items-center gap-4 sm:gap-10">
              <Link href="/login">로그인</Link>
              <Link href="/signup">회원가입</Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 sm:gap-3 md:gap-10">
              {type === 'employer' ? (
                <Link href="/owner/my-shop">내 가게</Link>
              ) : (
                <Link href="/worker/profile">내 프로필</Link>
              )}
              <button onClick={handleLogout}>로그아웃</button>
              <button onClick={handleNotificationClick} className="relative size-5 sm:size-6">
                {notifications.some((notification) => notification.status === 'unread') ? (
                  <Image
                    src="/header/ic-noti-active.svg"
                    alt="알림창(새로운 알림 있음)"
                    fill
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src="/header/ic-noti-inactive.svg"
                    alt="알림창"
                    fill
                    className="object-contain"
                  />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 모바일 검색창 */}
      <div className="mt-4 sm:hidden">
        <Search />
      </div>

      {/* 알림 모달 */}
      {isModalOpen && token && user?.id && (
        <Notification
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          token={token}
          userId={user.id}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      )}
    </header>
  );
};

export default Header;
