'use client';
import Link from 'next/link';
import Image from 'next/image';
import DropDownBtn from '../common/drop-down';
import Button from '../common/Button';
import { useState } from 'react';
import { shopFromCategories, seoulLocation } from '@/app/constants/shop-form-constants';
import { presignedImg, uploadToS3 } from '@/app/api/register-api';

interface ShopFormData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  originalHourlyPay: number;
  imageUrl?: string;
  description: string;
}

export default function ShopCommonForm({
  mode = 'create',
  initialData,
  onSubmit,
}: {
  mode?: 'create' | 'edit';
  initialData?: ShopFormData;
  onSubmit: (formData: ShopFormData) => void;
}) {
  const [file, setFile] = useState<File | null>(null); // 파일 상태
  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [address1, setAddress1] = useState(initialData?.address1 || '');
  const [address2, setAddress2] = useState(initialData?.address2 || '');
  const [originalHourlyPay, setOriginalHourlyPay] = useState<number>(
    initialData?.originalHourlyPay || 0
  );
  const [description, setDescription] = useState(initialData?.description || '');
  const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || null);

  const isFormValid =
    name.trim() !== '' &&
    category.trim() !== '' &&
    address1.trim() !== '' &&
    address2.trim() !== '' &&
    originalHourlyPay > 0;

  const renderDropDown = (
    id: string,
    categories: string[],
    category: string,
    onSelect: (value: string) => void
  ) => (
    <DropDownBtn
      id={id}
      categories={categories}
      selectedCategory={category}
      onSelectCategory={onSelect}
    />
  );

  const handleCategorySelect = (shopFromCategories: string) => {
    setCategory(shopFromCategories);
  };

  const handleAddressCategorySelect = (address1: string) => {
    setAddress1(address1);
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // 파일 URL을 생성하여 미리보기
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    }
  };

  // 이미지 삭제 처리
  const handleRemoveImage = () => {
    setFile(null); // 파일 상태 초기화
    setPreviewUrl(null); // 미리보기 상태 초기화
  };

  const handleWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/,/g, ''); // 숫자만 남기기
    if (input === '' || /^\d*$/.test(input)) {
      const numericValue = input ? parseInt(input, 10) : 0; // 입력값을 숫자로 변환
      setOriginalHourlyPay(numericValue); // 숫자로 상태 설정
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('모든 필드를 올바르게 입력해 주세요!');
      return;
    }

    try {
      let imageUrl = initialData?.imageUrl; // 기존 이미지 URL 사용

      if (file) {
        // 새 이미지가 선택된 경우에만 업로드 로직 실행
        const presignedUrl: string = await presignedImg(file.name);
        const uploadedUrl = await uploadToS3(presignedUrl, file);
        imageUrl = uploadedUrl.split('?')[0];
      }

      const formData = {
        name,
        category,
        address1,
        address2,
        originalHourlyPay,
        imageUrl,
        description,
      };

      onSubmit(formData);
    } catch (error) {
      console.error('폼 제출 중 오류 발생:', error);
      alert('이미지 업로드 또는 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section className="w-full bg-gray-5 px-3 pb-20 pt-10 md:px-8 md:pb-[3.75rem] md:pt-[3.75rem] xl:px-60">
      <div className="mb-6 flex w-full items-center justify-between">
        <h3 className="flex-1 text-lg font-bold md:text-custom-xl">가게 정보</h3>
        <div className="h-auto w-full max-w-3.5 md:max-w-4">
          <Link href={mode === 'create' ? '/owner/my-shop/' : '/owner/my-shop'}>
            <Image
              className="object-contain"
              src="/shop-icons/close-icon.png"
              alt="닫기아이콘"
              width={18}
              height={18}
            />
          </Link>
        </div>
      </div>
      <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 md:w-full md:flex-row md:gap-5">
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="text-base font-normal text-gray-black" htmlFor="name">
              가게이름*
            </label>
            <input
              className="rounded-md border border-gray-30 py-4 pl-5 text-base font-normal text-gray-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
              placeholder="입력"
            />
          </div>
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="text-base font-normal text-gray-black" htmlFor="Category">
              분류*
            </label>
            {renderDropDown('Category', shopFromCategories, category, handleCategorySelect)}
          </div>
        </div>
        <div className="flex flex-col gap-6 md:w-full md:flex-row md:gap-5">
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="text-base font-normal text-gray-black" htmlFor="Address">
              주소*
            </label>
            {renderDropDown('Address', seoulLocation, address1, handleAddressCategorySelect)}
          </div>
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="text-base font-normal text-gray-black" htmlFor="MoreAddress">
              상세 주소*
            </label>
            <input
              className="rounded-md border border-gray-30 py-4 pl-5 text-base font-normal text-gray-black"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              type="text"
              id="MoreAddress"
              name="MoreAddress"
              placeholder="입력"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:w-[49%]">
          <label className="text-base font-normal text-gray-black" htmlFor="originalHourlyPay">
            기본 시급*
          </label>
          <div className="relative w-full">
            <input
              className="w-full rounded-md border border-gray-30 py-4 pl-5 text-base font-normal text-gray-black"
              type="text"
              value={originalHourlyPay.toLocaleString()}
              onChange={handleWageChange}
              id="originalHourlyPay"
              name="originalHourlyPay"
              placeholder="입력"
            />
            <span className="absolute right-5 top-1/2 z-10 -translate-y-1/2">원</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:max-w-[30.1875rem]">
          <div className="flex w-full items-center justify-between">
            <label className="text-base font-normal text-gray-black" htmlFor="Image">
              가게 이미지
            </label>
            {previewUrl && (
              <div
                className="h-auto w-full max-w-3.5 cursor-pointer md:max-w-4"
                onClick={handleRemoveImage}
              >
                <Image
                  className="object-contain"
                  src="/shop-icons/close-icon.png"
                  alt="닫기아이콘"
                  width={18}
                  height={18}
                />
              </div>
            )}
          </div>
          <div className="relative h-52 w-full rounded-md border border-gray-30 md:h-72">
            {/* 숨겨진 파일 입력 */}
            <input
              className="hidden"
              type="file"
              name="Image"
              id="Image"
              onChange={handleFileChange} // 파일 선택 시 처리
              accept="image/*" // 이미지 파일만 허용
            />

            {/* 커스텀 버튼 (이미지 추가하기) */}
            <label
              htmlFor="Image"
              className={`${mode === 'edit' ? 'z-10 bg-gray-black opacity-[70%]' : 'z-0'} absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3`}
            >
              <div className="h-auto w-full max-w-8">
                {mode === 'create' ? (
                  <Image
                    className="object-contain"
                    src="/shop-icons/camera.png"
                    alt="카메라 아이콘"
                    width={33}
                    height={27}
                  />
                ) : (
                  <Image
                    className="object-contain"
                    src="/shop-icons/camera-white.png"
                    alt="카메라 아이콘"
                    width={33}
                    height={27}
                  />
                )}
              </div>
              <span className={`${mode === 'create' ? '' : 'text-gray-white'}`}>
                {mode === 'create' ? '이미지 추가하기' : '이미지 변경하기'}
              </span>
            </label>

            {/* 선택된 이미지 미리보기 */}
            {previewUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="미리보기 이미지"
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-base font-normal text-gray-black" htmlFor="Description">
            가게 설명
          </label>
          <textarea
            className="h-32 w-full rounded-md border border-gray-30 py-4 pl-5 text-base font-normal text-gray-black md:h-40"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="Description"
            name="Description"
            placeholder="입력"
          />
        </div>
        <Button
          className="h-12 w-full !text-base md:mx-auto md:max-w-[19.5rem]"
          type="submit"
          variant={isFormValid ? 'primary' : 'reverse'}
          disabled={!isFormValid}
        >
          {mode === 'create' ? '등록하기' : '완료하기'}
        </Button>
      </form>
    </section>
  );
}
