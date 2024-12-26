'use client';
import { useRouter } from 'next/navigation';
import { registerShop } from '@/app/api/register-api';
import ShopCommonForm from '@/app/components/shop/shop-form';
import Modal from '@/app/components/modal/modal';
import { useModalShopStore } from '@/app/stores/modal-shop-store';
import { ShopFormData } from '@/app/types/ShopFormData';

export default function ShopRegisterPage() {
  const router = useRouter();
  const { modalOpen, modalMessage, redirectPath, setModalOpen, setModalMessage, setRedirectPath } =
    useModalShopStore();

  const handleRegisterSubmit = async (formData: ShopFormData) => {
    console.log('폼 데이터 확인:', formData);
    try {
      const result = await registerShop(formData);
      console.log('가게 등록 성공:', result);

      setModalMessage('가게 등록이 완료되었습니다.');
      setRedirectPath('/owner/my-shop');
      setModalOpen(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('가게 등록 실패:', error);

        setModalMessage(error.message || '오류가 발생했습니다. 다시 시도해주세요.');
        setRedirectPath('');
        setModalOpen(true);
      }
    }
  };

  const handleConfirm = () => {
    setModalOpen(false);
    if (redirectPath) {
      router.push(redirectPath);
    }
  };

  return (
    <>
      <ShopCommonForm mode="create" onSubmit={handleRegisterSubmit} />
      <Modal isOpen={modalOpen} onClose={handleConfirm}>
        {modalMessage}
      </Modal>
    </>
  );
}
