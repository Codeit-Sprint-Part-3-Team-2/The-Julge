import NoticeRegisterModal from '@/app/components/modal/NoticeRegisterModal';
import { useModalShopStore } from '@/app/stores/modal-shop-store';

export default function ApprovalButton({
  approve,
  onClick,
}: {
  approve: boolean;
  onClick: () => Promise<void>;
}) {
  const {
    modalOpen,
    modalMessage,
    modalFunction,
    setModalOpen,
    setModalMessage,
    setModalFunction,
  } = useModalShopStore();

  const isApprove = approve
    ? {
        content: '승인하기',
        style: 'border-blue-20 text-blue-20',
        message: '신청을 승인하시겠어요?',
      }
    : {
        content: '거절하기',
        style: 'border-red-40 text-red-40',
        message: '신청을 거절하시겠어요?',
      };

  const handleOnClick = () => {
    setModalOpen(true);
    setModalMessage(isApprove.message);
    setModalFunction(onClick);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button className={`rounded-lg border px-5 py-2 ${isApprove.style}`} onClick={handleOnClick}>
        {isApprove.content}
      </button>
      <NoticeRegisterModal isOpen={modalOpen} onClick={modalFunction} onClose={handleModalClose}>
        {modalMessage}
      </NoticeRegisterModal>
    </>
  );
}
