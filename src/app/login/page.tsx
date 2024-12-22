'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Modal from '../components/modal/modal';
import Button from '../components/common/Button';

// Form 데이터 타입 정의
interface LoginFormInputs {
  email: string;
  password: string;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function LoginPage() {
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리
  const router = useRouter(); // useRouter 선언

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginFormInputs>({
    mode: 'onBlur', // 포커스 아웃 시 유효성 검사 실행
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const { email, password } = data;

    // Mock API 응답 처리
    const loginSuccess = email === 'test@test.com' && password === 'password123';

    if (loginSuccess) {
      localStorage.setItem('accessToken', 'mockAccessToken123'); // 엑세스 토큰 저장
      alert('로그인 성공!');
      router.push('/posts'); // 공고 리스트 페이지로 이동
    } else {
      setShowModal(true); // 비밀번호 불일치 시 모달 표시
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-white font-sans">
      {/* 모달 컴포넌트 */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        비밀번호가 일치하지 않습니다.
      </Modal>

      <div className="relative flex w-full max-w-md flex-col bg-gray-white p-4">
        <div className="relative mx-auto h-[45px] w-[208px] sm:w-[248px]">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            fill
            priority
            sizes="(max-width: 248px) 208px, (max-width: 1200px) 400px, 800px"
            className="mx-auto mb-10 cursor-pointer"
            onClick={() => router.push('/posts')}
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
            {errors.email && <p className="mt-1 text-sm text-red-50">{errors.email?.message}</p>}
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
              <p className="mt-1 text-sm text-red-50">{errors.password?.message}</p>
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
