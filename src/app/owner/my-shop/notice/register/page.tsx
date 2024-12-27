'use client';

import NoticeRegisterForm from '@/app/components/my-shop/register/NoticeRegisterForm';
import useAuthStore from '@/app/stores/authStore';
import { postShopNotice } from '@/app/api/api';

export default function NoticeRegisterEditPage() {
  const { token, user } = useAuthStore();
  const shopId = user?.shop?.item.id;

  if (!shopId || !token) {
    return <div className="my-10 text-center">로그인이 필요합니다.</div>;
  }

  return (
    <>
      <div className="container h-[100%] pb-20 sm:h-[calc(100vh-8rem-6.8rem)]">
        <NoticeRegisterForm
          mode="create"
          token={token}
          shopId={shopId}
          onChange={(token, shopId, data) => postShopNotice(token, shopId, data)}
        />
      </div>
    </>
  );
}
