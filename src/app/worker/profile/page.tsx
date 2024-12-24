'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LayoutWrapper from '@/app/components/worker/LayoutWrapper';
import EmptyContent from '@/app/components/worker/EmptyContent';
import ProfileInfo from '@/app/components/worker/ProfileInfo';
import ApplicationHistory from '@/app/components/worker/ApplicationHistory';
import useAuthStore from '@/app/stores/authStore';

const ProfilePage = () => {
  const { initialize, isInitialized, getMe, type, token, userId, profileRegistered, user } =
    useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isInitialized) return;

    const fetchData = async () => {
      if (!token || !userId) {
        router.push('/login');
        return;
      }

      try {
        await getMe();
      } catch (error) {
        console.error('프로필 로드 실패:', error);
        router.push('/login');
      }
    };

    fetchData();
  }, [isInitialized, token, userId, getMe, router]);

  useEffect(() => {
    if (type && type !== 'employee') {
      router.push('/');
    }
  }, [type, router]);

  if (!isInitialized || profileRegistered === null || user === null) {
    return <div>로딩 중...</div>;
  }

  if (type !== 'employee') {
    return <div>접근 권한이 없습니다.</div>;
  }

  return (
    <div className="text-gray-black">
      {profileRegistered ? (
        <>
          <LayoutWrapper>
            <ProfileInfo user={user} />
          </LayoutWrapper>
          <ApplicationHistory />
        </>
      ) : (
        <LayoutWrapper>
          <EmptyContent
            title="내 프로필"
            content="내 프로필을 등록하고 원하는 가게에 지원해 보세요."
            buttonText="내 프로필 등록하기"
            onButtonClick={() => router.push('/worker/profile/register')}
          />
        </LayoutWrapper>
      )}
    </div>
  );
};

export default ProfilePage;
