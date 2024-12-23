'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Modal from '../components/modal/modal';
import Button from '../components/common/Button';

const BASE_URL = 'https://bootcamp-api.codeit.kr/api/11-2/the-julge/token';

interface LoginFormInputs {
  email: string;
  password: string;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const { email, password } = data;

    try {
      // 서버로 로그인 요청
      const response = await axios.post(BASE_URL, { email: email, password: password });

      if (response.status === 200) {
        // 로그인 성공: accessToken 저장 및 페이지 이동
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        router.push('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setShowModal(true);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-white font-sans">
      {/* 모달 컴포넌트 */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        비밀번호가 일치하지 않습니다.
      </Modal>

      <div className="relative flex w-full max-w-md flex-col bg-gray-white p-4">
        <div className="relative mx-auto mb-10 h-[45px] w-[208px] sm:w-[248px]">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            fill
            priority
            className="mx-auto cursor-pointer"
            onClick={() => router.push('/')}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-left font-sans text-base font-normal leading-[26px] text-gray-black"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: '이메일을 입력해 주세요.',
                pattern: {
                  value: emailRegex,
                  message: '이메일 형식으로 작성해 주세요.',
                },
              })}
              onBlur={() => trigger('email')}
              className={`w-full rounded-md border px-5 py-4 text-sm`}
              placeholder="입력"
            />
            {errors.email && <p className="mt-1 text-sm text-orange">{errors.email?.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-left font-sans text-base font-normal leading-[26px] text-gray-black"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: '비밀번호를 입력해 주세요.',
                minLength: {
                  value: 8,
                  message: '8자 이상 작성해 주세요.',
                },
              })}
              onBlur={() => trigger('password')}
              className={`w-full rounded-md border px-5 py-4 text-sm`}
              placeholder="입력"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-orange">{errors.password?.message}</p>
            )}
          </div>

          <Button type="submit" className="mt-2 px-32 py-3">
            로그인 하기
          </Button>
        </form>

        <p className="mt-6 text-center font-sans" style={{ color: '#333236' }}>
          회원이 아니신가요?{' '}
          <span
            onClick={() => router.push('/signup')}
            className="cursor-pointer underline"
            style={{ color: '#5534da' }}
          >
            회원가입하기
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
