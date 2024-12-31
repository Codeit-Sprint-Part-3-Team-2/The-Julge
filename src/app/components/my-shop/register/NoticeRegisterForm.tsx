'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { PostNotice, PostNoticeResponse } from '@/app/types/Shop';
import FormInput from '@/app/components/my-shop/register/FormInput';
import Link from 'next/link';
import Modal from '@/app/components/modal/modal';

interface NoticeRegisterForm {
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
}

interface PostNoticeResponseItem {
  item: PostNoticeResponse;
  links: [];
}

export default function NoticeRegisterPage({
  mode,
  token,
  shopId,
  noticeId,
  onChange,
}: {
  mode: 'create' | 'edit';
  token: string;
  shopId: string;
  noticeId?: string;
  onChange: (
    token: string,
    shopId: string,
    data: PostNotice,
    noticeid?: string
  ) => Promise<PostNoticeResponseItem>;
}) {
  const router = useRouter();
  const [hourlyPay, setHourlyPay] = useState<string>('');
  const [workhour, setWorkhour] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<PostNoticeResponseItem | null>(null);

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
    try {
      if (mode === 'create') {
        const response = await onChange(token, shopId, data);
        if (!response) return;
        setResponse(response);
        setModalOpen(true);
      } else {
        const response = await onChange(token, shopId, data, noticeId as string);
        if (!response) return;
        setResponse(response);
        setModalOpen(true);
      }
    } catch (error) {
      console.error(error);
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);

    if (mode === 'create' && response) {
      router.push(`/owner/my-shop/notice/${response.item.id}`);
    } else if (mode === 'edit' && response) {
      router.push(`/owner/my-shop/notice/${noticeId}`);
    } else {
      router.push(`/owner/my-shop`);
    }
  };

  return (
    <>
      {response ? (
        <Modal isOpen={modalOpen} onClose={handleModalClose}>
          {mode === 'create' ? '공고가 등록되었습니다.' : '공고가 수정되었습니다.'}
        </Modal>
      ) : (
        <Modal isOpen={modalOpen} onClose={handleModalClose}>
          {mode === 'create' ? '공고 등록에 실패하였습니다.' : '공고 수정에 실패하였습니다.'}
        </Modal>
      )}
      <div className="flex items-start justify-between sm:items-center">
        <h3 className="h3">{mode === 'create' ? '공고 등록' : '공고 수정'}</h3>
        <Link href="/owner/my-shop">
          <div className="relative top-1 h-4 w-4 sm:mb-8">
            <Image fill src="/my-shop/x.svg" alt="notice" sizes="(max-width: 640px) 16px" />
          </div>
        </Link>
      </div>
      <form className="mt-8" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3">
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
          <div className="col-span-2 md:col-span-3">
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
          <button className="buttonVer1 w-full sm:w-[21rem]" type="submit">
            {mode === 'create' ? '등록하기' : '수정하기'}
          </button>
        </div>
      </form>
    </>
  );
}
