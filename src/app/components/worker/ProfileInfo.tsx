import Image from 'next/image';
import Button from '../common/Button';
import { User } from '@/app/types/Auth';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProfileInfoProps {
  user: User | null;
  onButtonClick?: () => void;
}

// 프로필 컴포넌트
const ProfileInfo = ({ user, onButtonClick }: ProfileInfoProps) => {
  if (!user) {
    return (
      <div className="flex h-60 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col justify-between lg:flex-row">
      <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-[1.75rem]">내 프로필</h2>
      <div className="w-full rounded-xl bg-red-10 p-5 text-sm sm:p-8 sm:text-base lg:max-w-2xl">
        <div className="relative flex flex-col gap-2 sm:gap-3">
          <div className="font-bold">
            <p className="mb-2 text-orange">이름</p>
            <p className="text-2xl sm:text-[1.75rem]">{user.name}</p>
          </div>

          <div className="flex items-center text-gray-50">
            <div className="relative mr-[0.375rem] size-4 sm:size-5">
              <Image src="/worker/ic-mobile.svg" alt="연락처" fill className="object-contain" />
            </div>
            <p>{user.phone}</p>
          </div>

          <div className="flex items-center text-gray-50">
            <div className="relative mr-[0.375rem] size-4 sm:size-5">
              <Image src="/worker/ic-location.svg" alt="지역" fill className="object-contain" />
            </div>
            <p>선호 지역: {user.address}</p>
          </div>

          <p className="mt-3 sm:mt-4">{user.bio}</p>

          <Button
            variant="reverse"
            onClick={onButtonClick}
            className="absolute right-0 top-0 w-24 p-[0.625rem] sm:w-44 sm:p-[0.875rem]"
          >
            편집하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
