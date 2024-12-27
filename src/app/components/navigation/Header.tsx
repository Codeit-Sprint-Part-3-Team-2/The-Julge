'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Search from './Search';
import Notification from './Notification';
import useModalState from '@/app/hooks/useModalState';

interface HeaderProps {
  hiddenPaths: string[];
}

const Header = ({ hiddenPaths }: HeaderProps) => {
  // 임시 로그인 상태
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // 임시 사용자 역할 (owner: 사장님, worker: 알바생)
  const [userRole, setUserRole] = useState<'owner' | 'worker' | null>(null);
  // 새로운 알림 상태
  const [hasNewNotifications, setHasNewNotifications] = useState<boolean>(false);
  // 모달 상태
  const { isModalOpen, toggleModal } = useModalState();

  // 임시 로그인, 로그아웃 핸들러
  const handleLogin = (role: 'owner' | 'worker') => {
    setHasNewNotifications(true);
    setIsAuthenticated(true);
    setUserRole(role);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // 헤더 없는 페이지의 경우
  const pathname = usePathname();
  const hiddenHeader = hiddenPaths.some((path) => pathname.startsWith(path));
  if (hiddenHeader) return null;

  // 알림 버튼 클릭 시
  const handleNotificationClick = () => {
    setHasNewNotifications(false); // 임시 알림 읽음
    toggleModal(); // 모달 토글
  };

  return (
    <header className="sticky inset-x-0 top-0 z-20 bg-white px-5 py-2.5 text-sm text-gray-black sm:px-8 sm:py-4 sm:text-base lg:px-0">
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
          {!isAuthenticated ? (
            <div className="flex items-center gap-4 sm:gap-10">
              {/* 임시로그인 */}
              <button onClick={() => handleLogin('owner')}>사장님 로그인</button>
              <button onClick={() => handleLogin('worker')}>알바생 로그인</button>
              {/* <Link href="/login">로그인</Link> */}
              <Link href="/signup">회원가입</Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 sm:gap-3 md:gap-10">
              {userRole === 'owner' ? (
                <Link href="/owner">내 가게</Link>
              ) : (
                <Link href="/worker/profile">내 프로필</Link>
              )}
              <button onClick={handleLogout}>로그아웃</button>
              <button onClick={handleNotificationClick} className="relative size-5 sm:size-6">
                {hasNewNotifications ? (
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
      {isModalOpen && <Notification {...{ isModalOpen, toggleModal }} />}
    </header>
  );
};

export default Header;
