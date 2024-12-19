'use client';

import AddPost from '@/app/components/my-shop/AddPost';

export default function MyShopPage() {
  return (
    <>
      <div className="container">
        <section className="mt-16">
          <h3 className="h3">내 가게</h3>
          <AddPost
            content="가게를 등록해 보세요."
            buttonLink="/owner/my-shop/register"
            buttonText="가게 등록하기"
          />
        </section>
        <section className="my-32">
          <h3 className="h3">등록한 공고</h3>
          <AddPost
            content="공고를 등록해 보세요."
            buttonLink="/owner/my-shop/notice/register"
            buttonText="공고 등록하기"
          />
        </section>
      </div>
    </>
  );
}