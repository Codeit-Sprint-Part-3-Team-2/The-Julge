'use client';

import NoticeRegisterForm from '@/app/components/my-shop/register/NoticeRegisterForm';
import useAuthStore from '@/app/stores/authStore';
import { putShopNotice } from '@/app/api/api';
import { useParams } from 'next/navigation';

export default function NoticeRegisterEditPage() {
  const { token, user } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const { id } = useParams<{ id: string }>();

  if (!shopId || !token) {
    return <div className="my-10 text-center">로그인이 필요합니다.</div>;
  }

  if (!id) {
    return <div className="my-10 text-center">잘못된 접근입니다.</div>;
  }

  return (
    <>
      <div className="container pb-20">
        <NoticeRegisterForm
          mode="edit"
          token={token}
          shopId={shopId}
          noticeId={id as string}
          onChange={(token, shopId, data, noticeId) =>
            putShopNotice(token, shopId, data, noticeId as string)
          }
        />
      </div>
    </>
  );
}
