'use client';

import { useForm } from 'react-hook-form';
import { postShopNotice } from '@/app/api/api';
import useAuthStore from '@/app/stores/authStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { PostNotice } from '@/app/types/Shop';
import FormInput from '@/app/components/my-shop/register/FormInput';
import Link from 'next/link';

interface NoticeRegisterForm {
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
}

export default function NoticeRegisterPage() {
  const { token, user } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const router = useRouter();
  const [hourlyPay, setHourlyPay] = useState<string>('');
  const [workhour, setWorkhour] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoticeRegisterForm>({ defaultValues: { description: '' } });

  const formatHourlyPay = (value: string) => {
    setHourlyPay(value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };

  const formatWorkhour = (value: string) => {
    setWorkhour(value.replace(/\D/g, ''));
  };

  const handleSubmitForm = async (form: NoticeRegisterForm) => {
    if (!shopId || !token) return;

    const date = new Date(form.startsAt);
    form.startsAt = date.toISOString();
    form.hourlyPay = form.hourlyPay.replace(/\D/g, '');

    const data: PostNotice = {
      hourlyPay: parseInt(form.hourlyPay),
      startsAt: form.startsAt,
      workhour: parseInt(form.workhour),
      description: form.description,
    };

    await postShopNotice(token, shopId, data);
    alert('공고가 등록되었습니다.');
    router.push('/owner/my-shop');
  };

  if (!shopId || !token) {
    return <div className="my-10 text-center">로그인이 필요합니다.</div>;
  }

  return (
    <>
      <div className="container h-[calc(100vh-8rem-6.8rem)]">
        <div className="flex items-center justify-between">
          <h3 className="h3">공고 등록</h3>
          <Link href="/owner/my-shop">
            <div className="relative h-4 w-4">
              <Image fill src="/my-shop/x.svg" alt="notice" sizes="(max-width: 640px) 16px" />
            </div>
          </Link>
        </div>
        <form className="mt-8" onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="grid grid-cols-3 gap-4">
            <FormInput
              name="hourlyPay"
              label="시급*"
              placeholder="0"
              validate={{ required: '시급을 입력해주세요.' }}
              register={register}
              errors={errors}
              value={hourlyPay}
              onInput={(e) => formatHourlyPay(e.currentTarget.value)}
            />
            <FormInput
              name="startsAt"
              label="시작일*"
              type="date"
              validate={{ required: '시작일을 입력해주세요.' }}
              register={register}
              errors={errors}
            />
            <FormInput
              name="workhour"
              label="업무 시간*"
              placeholder="0"
              validate={{ required: '업무 시간을 입력해주세요.' }}
              register={register}
              errors={errors}
              value={workhour}
              onInput={(e) => formatWorkhour(e.currentTarget.value)}
            />
            <div className="col-span-3">
              <FormInput
                name="description"
                label="공고 설명"
                type="textarea"
                placeholder="공고 설명을 입력해주세요."
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="buttonVer1 w-full md:w-[21rem]" type="submit">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
