import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '../../stores/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedTypes: ('employee' | 'employer')[];
}

const ProtectedRoute = ({ children, allowedTypes }: ProtectedRouteProps) => {
  const router = useRouter();
  const { token, type } = useAuthStore();

  useEffect(() => {
    if (!token || !type || !allowedTypes.includes(type)) {
      router.push('/login'); // 인증 실패 시 로그인 페이지로 이동
    }
  }, [token, type, allowedTypes, router]);

  // 렌더링 조건 추가
  if (!token || !type || !allowedTypes.includes(type)) {
    return null; // 인증 확인 전에는 아무것도 렌더링하지 않음
  }

  return <>{children}</>;
};

export default ProtectedRoute;
