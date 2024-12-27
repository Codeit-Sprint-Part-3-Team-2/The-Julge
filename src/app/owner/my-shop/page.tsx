'use client';

import AddPost from '@/app/components/my-shop/AddPost';
import useAuthStore from '@/app/stores/authStore';
import { getMyShop, getShopNotices } from '@/app/api/api';
import { useEffect, useCallback, useState } from 'react';
import { Shop, Notice } from '@/app/types/Shop';
import MyShop from '@/app/components/my-shop/myShop';
import NoticeCard from '@/app/components/my-shop/NoticeCard';

interface NoticeItem {
  item: Notice;
  links: [];
}

export default function MyShopPage() {
  const { user, type } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const [shop, setShop] = useState<Shop | null>(null);
  const [notice, setNotice] = useState<NoticeItem[] | null>(null);

  const fetchShop = useCallback(async () => {
    const response = await getMyShop(shopId as string);
    setShop(response.item);
  }, [shopId]);

  const fetchNotice = useCallback(async () => {
    if (!shopId) return;

    const response = await getShopNotices(shopId as string);
    setNotice(response.items);
  }, [shopId]);

  useEffect(() => {
    if (!shopId) return;

    fetchShop();
    fetchNotice();
  }, [fetchShop, fetchNotice, shopId]);

  if (!user) {
    return <div className="my-10 text-center">로그인이 필요합니다.</div>;
  }

  if (type === 'employee') {
    return <div className="my-10 text-center">접근 권한이 없습니다.</div>;
  }

  return (
    <div className="container">
      <div>
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
      </div>
    </div>
  );
}
