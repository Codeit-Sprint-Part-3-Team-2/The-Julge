'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import LayoutWrapper from '@/app/components/worker/LayoutWrapper';
import Button from '@/app/components/common/Button';
import DropDownBtn from '@/app/components/common/drop-down';
import InputField from '@/app/components/worker/InputField';
import useAuthStore from '@/app/stores/authStore';
import { useRouter } from 'next/navigation';
import { updateUserProfile } from '@/app/api/api';
import { LOCATION_LIST } from '@/app/constants/location';

// 프로필 등록하기
const ProfileRegisterPage = () => {
  const { token, userId, type } = useAuthStore();
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false); // 제출 시 오류 체크
  const [isLoading, setIsLoading] = useState(false);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!userId) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    } else if (type !== 'employee') {
      alert('접근 권한이 없습니다.');
      router.push('/');
      return;
    }
  }, [userId, router, type]);

  // 제출 형식
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (submitAttempted && !e.target.value) {
      setNameError('이름을 입력해주세요.');
    } else if (submitAttempted && !/^[a-zA-Z가-힣]+$/.test(e.target.value)) {
      setNameError('이름은 한글과 영어만 입력 가능합니다.');
    } else {
      setNameError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (submitAttempted && !e.target.value) {
      setPhoneError('연락처를 입력해주세요.');
    } else if (submitAttempted && !/^\d{3}-\d{4}-\d{4}$/.test(e.target.value)) {
      setPhoneError('연락처는 000-0000-0000 형식으로 입력해주세요.');
    } else {
      setPhoneError('');
    }
  };

  const handleAddressChange = (selectedAddress: string) => {
    setAddress(selectedAddress);
    if (submitAttempted && !selectedAddress) {
      setAddressError('선호 지역을 선택해주세요.');
    } else {
      setAddressError('');
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const nameRegex = /^[a-zA-Z가-힣]+$/;
    if (!name) {
      setNameError('이름을 입력해주세요.');
      nameInputRef.current?.focus();
      return;
    } else if (!nameRegex.test(name)) {
      setNameError('이름은 한글과 영어만 입력 가능합니다.');
      nameInputRef.current?.focus();
      return;
    }

    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    if (!phone) {
      setPhoneError('연락처를 입력해주세요.');
      phoneInputRef.current?.focus();
      return;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError('연락처는 000-0000-0000 형식으로 입력해주세요.');
      phoneInputRef.current?.focus();
      return;
    }

    if (!address) {
      setAddressError('선호 지역을 선택해주세요.');
      return;
    }

    if (!token || !userId) return;

    setIsLoading(true);

    try {
      const response = await updateUserProfile(token, userId, { name, phone, address, bio });

      if (
        response?.item &&
        response.item.name === name &&
        response.item.phone === phone &&
        response.item.address === address &&
        response.item.bio === bio
      ) {
        alert('등록이 완료되었습니다.');
        router.push('/worker/profile');
      } else {
        alert('프로필 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(error);
      alert('프로필 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <LayoutWrapper className="bg-gray-5 pb-[5rem] text-gray-black">
      <div className="mb-6 flex justify-between sm:mb-8">
        <h2 className="text-xl font-bold sm:text-[1.75rem]">내 프로필</h2>
        <button onClick={handleClose} className="relative size-6 sm:size-8">
          <Image src="/header/ic-close.svg" alt="닫기" fill className="object-contain" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5 grid grid-cols-1 gap-5 sm:mb-6 sm:grid-cols-2 sm:gap-y-6 lg:grid-cols-3">
          {/* 이름 */}
          <InputField
            label="이름"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="이름을 입력하세요"
            required
            ref={nameInputRef}
            error={nameError}
          />

          {/* 연락처 */}
          <InputField
            label="연락처"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="000-0000-0000"
            required
            type="tel"
            ref={phoneInputRef}
            error={phoneError}
          />

          {/* 선호지역 */}
          <div>
            <label htmlFor="address">선호 지역*</label>
            <DropDownBtn
              id="address"
              categories={Object.values(LOCATION_LIST)}
              selectedCategory={address}
              onSelectCategory={handleAddressChange}
              required
            />
            {submitAttempted && !address && (
              <p className="mt-1 text-sm text-red-40">{addressError}</p>
            )}
          </div>
        </div>

        {/* 소개 */}
        <div>
          <label htmlFor="bio">소개</label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={handleBioChange}
            placeholder="자기소개를 입력하세요"
            rows={4}
            className="mt-2 w-full rounded-md border border-gray-30 px-5 py-4 text-base font-normal"
          />
        </div>

        {/* 등록하기 버튼 */}
        <div className="text-center">
          <Button
            className="mt-6 w-full p-[0.875rem] sm:mt-8 sm:max-w-80"
            type="submit"
            disabled={isLoading}
          >
            등록하기
          </Button>
        </div>
      </form>
    </LayoutWrapper>
  );
};

export default ProfileRegisterPage;
