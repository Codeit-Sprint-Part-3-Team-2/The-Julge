'use client';

import AddPost from '@/app/components/my-shop/AddPost';
import useAuthStore from '@/app/stores/authStore';
import { getMyShop, getShopNotices } from '@/app/api/api';
import { useEffect, useCallback, useState, useRef } from 'react';
import { Shop, Notice } from '@/app/types/Shop';
import MyShop from '@/app/components/my-shop/MyShop';
import NoticeCard from '@/app/components/my-shop/NoticeCard';

const LIMIT = 12;

interface NoticeItem {
  item: Notice;
  links: [];
}

export default function MyShopPage() {
  const { user, type } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const [shop, setShop] = useState<Shop | null>(null);
  const [notice, setNotice] = useState<NoticeItem[] | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const bottomDivRef = useRef<HTMLDivElement>(null);

  const fetchShop = useCallback(async () => {
    if (!shopId) return;
    const response = await getMyShop(shopId);
    setShop(response.item);
  }, [shopId]);

  const fetchNotice = useCallback(async () => {
    if (!shopId) return;
    setIsFetching(true);
    const response = await getShopNotices(shopId, offset, LIMIT);
    setHasNext(response.hasNext);
    setIsFetching(false);
    setNotice((prev) => {
      if (prev) {
        return [...prev, ...response.items];
      }
      return response.items;
    });
  }, [shopId, offset]);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  useEffect(() => {
    if (isFetching || !hasNext) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNotice();
          setOffset((prev) => prev + LIMIT);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = bottomDivRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNotice, offset, hasNext, isFetching]);

  if (!user || !shopId) {
    return <div className="my-10 text-center">로그인이 필요합니다.</div>;
  }

  if (type === 'employee') {
    return <div className="my-10 text-center">접근 권한이 없습니다.</div>;
  }

  return (
    <div className="container">
      <section>
        <h3 className="h3">내 가게</h3>
        {!shop && (
          <AddPost
            content="가게를 등록해 보세요."
            buttonLink="/owner/my-shop/register"
            buttonText="가게 등록하기"
          />
        )}
        {shop && <MyShop shop={shop} />}
      </section>
      <section className="sm:my-30 my-20">
        <h3 className="h3">내가 등록한 공고</h3>
        {!notice && (
          <AddPost
            content="공고를 등록해 보세요."
            buttonLink="/owner/my-shop/notice/register"
            buttonText="공고 등록하기"
          />
        )}
        {notice && shop && (
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
            {notice.map((not) => (
              <div key={not.item.id}>
                <NoticeCard not={not} shop={shop} closed={not.item.closed} />
              </div>
            ))}
          </div>
        )}
      </section>
      <div ref={bottomDivRef} className="h-20"></div>
    </div>
  );
}
