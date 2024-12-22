'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LayoutWrapper from '@/app/components/worker/LayoutWrapper';
import EmptyContent from '@/app/components/worker/EmptyContent';
import ProfileInfo from '@/app/components/worker/ProfileInfo';
import ApplicationHistory from '@/app/components/worker/ApplicationHistory';

const ProfilePage = () => {
  // 임시 프로필 등록 여부 상태
  const [isProfileRegistered, setIsProfileRegistered] = useState<boolean | null>(null);
  const router = useRouter();

  // 임시 프로필 등록 상태 확인
  useEffect(() => {
    const fetchProfileStatus = async () => {
      const profileStatus = await checkProfileStatus();
      setIsProfileRegistered(profileStatus);
    };

    fetchProfileStatus();
  }, []);

  // 프로필 상태를 확인중
  if (isProfileRegistered === null) {
    return <div>로딩 중...</div>;
  }

  const handleClick = () => {
    router.push('/worker/profile/register');
  };

  return (
    <div className="text-gray-black">
      {!isProfileRegistered ? (
        // 프로필과 신청 내역
        <>
          <LayoutWrapper>
            <ProfileInfo />
          </LayoutWrapper>
          <ApplicationHistory />
        </>
      ) : (
        // 프로필 없는 경우
        <LayoutWrapper>
          <EmptyContent
            title="내 프로필"
            content="내 프로필을 등록하고 원하는 가게에 지원해 보세요."
            buttonText="내 프로필 등록하기"
            onButtonClick={handleClick}
          />
        </LayoutWrapper>
      )}
    </div>
  );
};

// 임시 프로필 등록 여부 확인
const checkProfileStatus = async () => {
  return false;
};

export default ProfilePage;
