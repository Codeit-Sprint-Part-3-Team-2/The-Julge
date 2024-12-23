'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutWrapper from '@/app/components/worker/LayoutWrapper';
import EmptyContent from '@/app/components/worker/EmptyContent';
import ProfileInfo from '@/app/components/worker/ProfileInfo';
import ApplicationHistory from '@/app/components/worker/ApplicationHistory';
import useAuthStore from '@/app/stores/authStore';

const ProfilePage = () => {
  const { profileRegistered, getMe, type, token, userId } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    console.log('Tokennnnn:', token);
    const fetchData = async () => {
      if (token && userId) {
        try {
          await getMe();  
        } catch (error) {
          console.error('getMe 실패:', error);
        } finally {
          setLoading(false); 
        }
      } else {
        setLoading(false);  
        router.push('/login');  // 로그인 페이지로 리디렉션
      }
    };

    fetchData();
  }, [token, userId, getMe, router]);

  // `type`이 'employee'가 아닌 경우, 메인 페이지로 리디렉션
  useEffect(() => {
    if (type && type !== 'employee') {
      router.push('/');  // 'employee' 타입이 아니면 메인 페이지로 리디렉션
    }
  }, [type, router]);


  if (loading) {
    return <div>로딩 중...</div>; 
  }

  return (
    <div className="text-gray-black">
      {profileRegistered === null ? (
        <div>로딩 중...</div>  
      ) : type === 'employee' ? (
        profileRegistered ? (
          // 'employee' 타입이고 프로필이 등록된 경우
          <>
            <LayoutWrapper>
              <ProfileInfo />
            </LayoutWrapper>
            <ApplicationHistory />
          </>
        ) : (
          // 'employee' 타입이지만 프로필이 없는 경우
          <LayoutWrapper>
            <EmptyContent
              title="내 프로필"
              content="내 프로필을 등록하고 원하는 가게에 지원해 보세요."
              buttonText="내 프로필 등록하기"
              onButtonClick={() => router.push('/worker/profile/register')}
            />
          </LayoutWrapper>
        )
      ) : (
        // 'employee' 타입이 아닌 경우
        <div>접근 권한이 없습니다.</div>
      )}
    </div>
  );
};

export default ProfilePage;
