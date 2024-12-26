import NoticeRegisterModal from '@/app/components/modal/NoticeRegisterModal';
import useModalStore from '@/app/stores/modalStore';

export default function ApprovalButton({
  approve,
  onClick,
}: {
  approve: boolean;
  onClick: () => Promise<void>;
}) {
  const { openModal, isModalOpen } = useModalStore();

  const isApprove = approve
    ? { content: '승인하기', style: 'border-blue-20 text-blue-20', modal: '신청을 승인하시겠어요?' }
    : {
        content: '거절하기',
        style: 'border-red-40 text-red-40',
        modal: '신청을 거절하시겠어요?',
      };

  const handleOnClick = () => {
    if (isModalOpen) return;
    openModal();
  };

  return (
    <>
      <button className={`rounded-lg border px-5 py-2 ${isApprove.style}`} onClick={handleOnClick}>
        {isApprove.content}
      </button>
      {isModalOpen && <NoticeRegisterModal content={isApprove.modal} onClick={onClick} />}
    </>
  );
}
