'use client';

import useAuthStore from '@/app/stores/authStore';
import { getNoticeDetail, getNoticeApplications } from '@/app/api/api';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NoticeApplication, NoticeDetail } from '@/app/types/Shop';
import MyNotice from '@/app/components/my-shop/detail/MyNotice';
import PageNav from '@/app/components/my-shop/detail/PageNav';
import ApplicationTable from '@/app/components/my-shop/detail/ApplicationTable';

const LIMIT = 5;

interface NoticeApplicationItem {
  count: number;
  hasNext: boolean;
  items: NoticeApplication[];
  limit: number;
  links: [];
  offset: number;
}

export default function NoticePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const [content, setContent] = useState<NoticeDetail | null>(null);
  const [applications, setApplications] = useState<NoticeApplicationItem | null>(null);
  const [page, setPage] = useState<number>(1);

  const fetchNoticeDetail = useCallback(async () => {
    const response = await getNoticeDetail(shopId as string, id);
    setContent(response.item);
  }, [shopId, id]);

  const fetchNoticeApplications = useCallback(async () => {
    const response = await getNoticeApplications(shopId as string, id, page, LIMIT);
    setApplications(response);
    console.log(response);
  }, [shopId, id, page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    fetchNoticeDetail();
    fetchNoticeApplications();
  }, [fetchNoticeDetail, fetchNoticeApplications]);

  if (!content) {
    return <div className="my-10 text-center">로딩 중...</div>;
  }

  return (
    <>
      <div className="container">
        <section className="mt-10 sm:mt-16">
          <span className="label">{content.shop.item.category}</span>
          <h3 className="h3">{content.shop.item.name}</h3>
          <MyNotice notice={content} />
        </section>
        <section className="sm:my-30 my-20">
          <h3 className="h3">신청자 목록</h3>
          {applications && (
            <div className="mt-8 w-full rounded-lg border">
              <ApplicationTable applications={applications} />
              <PageNav
                page={page}
                limit={LIMIT}
                totalCount={applications.count}
                onChange={handlePageChange}
              />
            </div>
          )}
        </section>
      </div>
    </>
  );
}
