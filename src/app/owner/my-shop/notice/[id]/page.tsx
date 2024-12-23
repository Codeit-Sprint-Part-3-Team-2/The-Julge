'use client';

import useAuthStore from '@/app/stores/authStore';
import { getNoticeDetail } from '@/app/api/api';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NoticeDetail } from '@/app/types/Shop';
import MyNotice from '@/app/components/my-shop/detail/MyNotice';

export default function NoticePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const [content, setContent] = useState<NoticeDetail | null>(null);

  const fetchNoticeDetail = useCallback(async () => {
    const response = await getNoticeDetail(shopId as string, id);
    setContent(response.item);
    console.log(response.item);
  }, [shopId, id]);

  useEffect(() => {
    fetchNoticeDetail();
  }, [fetchNoticeDetail]);

  if (!content) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <div className="container">
        <section className="mt-10 sm:mt-16">
          <span className="label">{content.shop.item.category}</span>
          <h3 className="h3">{content.shop.item.name}</h3>
          <MyNotice notice={content} />
        </section>
        <section className="sm:my-30 my-20"></section>
      </div>
    </>
  );
}
