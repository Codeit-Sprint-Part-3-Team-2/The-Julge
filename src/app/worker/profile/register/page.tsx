'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import LayoutWrapper from '@/app/components/worker/LayoutWrapper';
import Button from '@/app/components/common/Button';
import DropDownBtn from '@/app/components/common/drop-down';
import InputField from '@/app/components/worker/InputField';

const ProfilRegisterePage = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [region, setRegion] = useState('');
  const [intro, setIntro] = useState('');
  const [nameError, setNameError] = useState('');
  const [contactError, setContactError] = useState('');
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const contactInputRef = useRef<HTMLInputElement | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
  };

  const handleRegionChange = (selectedRegion: string) => {
    setRegion(selectedRegion);
  };

  const handleIntroChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntro(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    setContactError('');

    // 이름 필드 검증
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

    // 연락처 형식 검증
    const contactRegex = /^\d{3}-\d{4}-\d{4}$/;
    if (!contact) {
      setContactError('연락처를 입력해주세요.');
      contactInputRef.current?.focus();
      return;
    } else if (!contactRegex.test(contact)) {
      setContactError('연락처는 000-0000-0000 형식으로 입력해주세요.');
      contactInputRef.current?.focus();
      return;
    }
    alert('신청버튼을 클릭하셨습니다.');
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
            id="contact"
            value={contact}
            onChange={handleContactChange}
            placeholder="000-0000-0000"
            required
            type="tel"
            ref={contactInputRef}
            error={contactError}
          />

          {/* 선호지역 */}
          <div>
            <label htmlFor="region">선호 지역</label>
            <DropDownBtn
              id="region"
              categories={['서울', '부산', '대구', '인천', '광주']}
              selectedCategory={region}
              onSelectCategory={handleRegionChange}
            />
          </div>
        </div>

        {/* 소개 */}
        <div>
          <label htmlFor="intro">자기소개</label>
          <textarea
            id="intro"
            name="intro"
            value={intro}
            onChange={handleIntroChange}
            placeholder="자기소개를 입력하세요"
            rows={4}
            className="mt-2 w-full rounded-md border border-gray-30 px-5 py-4 text-base font-normal"
          />
        </div>

        {/* 등록하기 버튼 */}
        <div className="text-center">
          <Button className="mt-6 w-full p-[0.875rem] sm:mt-8 sm:max-w-80" type="submit">
            등록하기
          </Button>
        </div>
      </form>
    </LayoutWrapper>
  );
};

export default ProfilRegisterePage;
