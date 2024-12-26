import Button from '../common/Button';
import useModalStore from '@/app/stores/modalStore';
import Image from 'next/image';

export default function NoticeRegisterModal({
  content,
  onClick,
}: {
  content: string;
  onClick: () => Promise<void>;
}) {
  const { closeModal } = useModalStore();

  const handleOnClick = async () => {
    await onClick();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      <div className="flex h-[11.5rem] w-[18rem] flex-col justify-between rounded-lg bg-gray-white p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-6 w-6">
            <Image fill src="/my-shop/modal-check.svg" alt="체크" sizes="(max-width: 640px) 24px" />
          </div>
          <span className="text-base font-normal text-black">{content}</span>
        </div>
        <div className="flex justify-center gap-2">
          <Button onClick={closeModal} className="h-9 w-20 rounded-md" variant="reverse">
            아니오
          </Button>
          <Button
            onClick={handleOnClick}
            className="h-9 w-20 rounded-md font-normal hover:bg-opacity-90"
            variant="primary"
          >
            예
          </Button>
        </div>
      </div>
    </div>
  );
}