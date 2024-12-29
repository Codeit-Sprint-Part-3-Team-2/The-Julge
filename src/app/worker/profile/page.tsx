'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutWrapper from '@/app/components/worker/LayoutWrapper';
import EmptyContent from '@/app/components/worker/EmptyContent';
import ProfileInfo from '@/app/components/worker/ProfileInfo';
import ApplicationHistory from '@/app/components/worker/ApplicationHistory';
import useAuthStore from '@/app/stores/authStore';
import { User } from '@/app/types/Auth';
import LoadingSpinner from '@/app/components/common/LoadingSpinner';

//내 프로필 페이지
const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const router = useRouter();
  const { initialize, isInitialized, getMe, type, token, userId } = useAuthStore();
  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isInitialized) return;

    const fetchData = async () => {
      if ((!token || !userId) && localStorage !== undefined) {
        router.push('/login');
        return;
      }

      try {
        const res = await getMe();
        setUserProfile(res.item);
      } catch (error) {
        console.error('프로필 로드 실패:', error);
        router.push('/login');
      }
    };

    fetchData();
  }, [isInitialized, token, userId, getMe, router]);

  useEffect(() => {
    if (isInitialized && !token) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    } else if (isInitialized && type !== 'employee') {
      alert('접근 권한이 없습니다.');
      router.push('/');
      return;
    }
  }, [token, router, type, isInitialized]);

  if (!isInitialized || !userProfile) {
    return (
      <div className="flex h-60 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="text-gray-black">
      {!!userProfile.name ? (
        <>
          <LayoutWrapper>
            <ProfileInfo
              user={userProfile}
              onButtonClick={() => router.push('/worker/profile/edit')}
            />
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
