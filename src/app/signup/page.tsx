'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Modal from '../components/modal/modal';
import Button from '../components/common/Button';

// Form 데이터 타입 정의
interface SignupFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  userType: string; // 회원 유형 추가
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function SignupPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm<SignupFormInputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    const { email } = data;

    // Mock 이메일 중복 확인 로직
    const emailExists = email === 'test@test.com';

    if (emailExists) {
      setModalMessage('이미 사용중인 이메일입니다');
      setShowModal(true);
    } else {
      alert('가입이 완료되었습니다');
      router.push('/login');
    }
  };

  const userTypeValue = watch('userType'); // 현재 선택된 회원 유형 감지

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-white">
      {/* 모달 컴포넌트 */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalMessage}
      </Modal>

      <div className="relative flex w-full max-w-md flex-col bg-gray-white p-4">
        <div className="relative mx-auto mb-10 h-[45px] w-[208px] sm:w-[248px]">
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
          {/* 이메일 입력 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-left text-base font-normal leading-[26px] text-gray-black"
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
              className={`w-full rounded-md border px-5 py-4 text-sm ${
                errors.email ? 'border-red-50' : ''
              }`}
              placeholder="입력"
            />
            {errors.email && <p className="mt-1 text-sm text-red-50">{errors.email?.message}</p>}
          </div>

          {/* 비밀번호 입력 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-left text-base font-normal leading-[26px] text-gray-black"
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
                  message: '8자 이상 입력해 주세요.',
                },
              })}
              onBlur={() => trigger('password')}
              className={`w-full rounded-md border px-5 py-4 text-sm ${
                errors.password ? 'border-red-50' : ''
              }`}
              placeholder="입력"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-50">{errors.password?.message}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-left text-base font-normal leading-[26px] text-gray-black"
            >
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: '비밀번호 확인을 입력해 주세요.',
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
              })}
              onBlur={() => trigger('confirmPassword')}
              className={`w-full rounded-md border px-5 py-4 text-sm ${
                errors.confirmPassword ? 'border-red-50' : ''
              }`}
              placeholder="입력"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-50">{errors.confirmPassword?.message}</p>
            )}
          </div>

          {/* 회원 유형 선택 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="userType"
              className="text-left text-base font-normal leading-[26px] text-gray-black"
            >
              회원 유형
            </label>
            <div className="flex h-[50px] gap-4">
              <button
                type="button"
                className={`flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm text-black ${
                  userTypeValue === '일반회원' ? 'border-red-50' : 'border-gray-30'
                }`}
                onClick={() => setValue('userType', '일반회원')}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    userTypeValue === '일반회원' ? 'border-red-50 bg-red-50' : 'border-gray-30'
                  }`}
                >
                  {userTypeValue === '일반회원' && (
                    <span className="text-xs text-gray-white">✔</span>
                  )}
                </span>
                알바님
              </button>

              <button
                type="button"
                className={`flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm text-black ${
                  userTypeValue === '사업자회원' ? 'border-red-50' : 'border-gray-30'
                }`}
                onClick={() => setValue('userType', '사업자회원')}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    userTypeValue === '사업자회원' ? 'border-red-50 bg-red-50' : 'border-gray-30'
                  }`}
                >
                  {userTypeValue === '사업자회원' && (
                    <span className="text-xs text-gray-white">✔</span>
                  )}
                </span>
                사장님
              </button>
            </div>
            {errors.userType && (
              <p className="mt-1 text-sm text-red-50">{errors.userType?.message}</p>
            )}
          </div>

          {/* 가입하기 버튼 */}
          <Button type="submit" className="mt-2 px-32 py-3">
            가입하기
          </Button>
        </form>

        <p className="mt-6 text-center" style={{ color: '#333236' }}>
          이미 가입하셨나요?{' '}
          <span
            onClick={() => router.push('/login')}
            className="cursor-pointer underline"
            style={{ color: '#5534da' }}
          >
            로그인하기
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
