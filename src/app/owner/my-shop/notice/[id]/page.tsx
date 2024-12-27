'use client';

import useAuthStore from '@/app/stores/authStore';
import { getNoticeDetail, getNoticeApplications } from '@/app/api/api';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NoticeApplication, NoticeDetail } from '@/app/types/Shop';
import MyNotice from '@/app/components/my-shop/detail/MyNotice';
import PageNav from '@/app/components/my-shop/detail/PageNav';
import ApplicationTable from '@/app/components/my-shop/detail/ApplicationTable';
import AddPost from '@/app/components/my-shop/AddPost';

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
  const { user, token } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const [content, setContent] = useState<NoticeDetail | null>(null);
  const [applications, setApplications] = useState<NoticeApplicationItem | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const fetchNoticeDetail = useCallback(async () => {
    const response = await getNoticeDetail(shopId as string, id);
    setContent(response.item);
  }, [shopId, id]);

  const fetchNoticeApplications = useCallback(async () => {
    const response = await getNoticeApplications(shopId as string, id, offset, LIMIT);
    setApplications(response);
  }, [shopId, id, offset]);

  const handlePageChange = (page: number) => {
    setOffset((page - 1) * LIMIT);
    setPage(page);
  };

  useEffect(() => {
    fetchNoticeDetail();
    fetchNoticeApplications();
  }, [fetchNoticeDetail, fetchNoticeApplications]);

  if (!shopId || !token) {
    return <div className="my-10 text-center">로그인이 필요합니다.</div>;
  }

  if (!content || !applications) {
    return <div className="my-10 text-center">접근 권한이 없습니다.</div>;
  }

  return (
    <>
      <div className="container">
        <section>
          <span className="category">{content.shop.item.category}</span>
          <h3 className="h3">{content.shop.item.name}</h3>
          <MyNotice notice={content} />
        </section>
        <section className="sm:my-30 my-20">
          <h3 className="h3">신청자 목록</h3>
          {applications.items.length > 0 ? (
            <div className="mt-8 w-full rounded-lg border">
              <ApplicationTable
                applications={applications.items}
                token={token}
                shopId={shopId}
                noticeId={id}
              />
              <PageNav
                page={page}
                limit={LIMIT}
                totalCount={applications.count}
                hasNext={applications.hasNext}
                onChange={handlePageChange}
              />
            </div>
          ) : (
            <AddPost
              content="신청자가 없습니다."
              buttonLink="/owner/my-shop"
              buttonText="내 가게로 이동"
            />
          )}
        </section>
      </div>
    </>
  );
}
