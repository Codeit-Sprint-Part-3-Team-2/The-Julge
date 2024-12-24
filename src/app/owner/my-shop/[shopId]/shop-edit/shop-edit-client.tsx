'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { editShop, getShopDetails } from '@/app/api/register-api';
import ShopCommonForm from '@/app/components/shop/shop-form';
import Modal from '@/app/components/modal/modal';
import ShopFormSkeleton from '@/app/components/shop/skeleton/shop-form-skeleton';

interface ShopFormData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  originalHourlyPay: number;
  imageUrl?: string;
  description: string;
}

export default function ShopEditClient() {
  const router = useRouter();
  const { shopId } = useParams<{ shopId: string }>();
  const [shopDetails, setShopDetails] = useState<ShopFormData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [redirectPath, setRedirectPath] = useState('');

  useEffect(() => {
    if (!shopId) {
      alert('잘못된 경로입니다. 가게 ID를 확인해 주세요.');
      return;
    }

    getShopDetails(shopId)
      .then((data) => {
        setShopDetails(data.item);
      })
      .catch(handleError);
  }, [shopId]);

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      console.error('오류 발생:', error.message);
      alert(`오류 발생: ${error.message}`);
    } else {
      console.error('알 수 없는 오류 발생', error);
      alert('알 수 없는 오류가 발생했습니다.');
    }
  };

  const handleEditSubmit = async (formData: ShopFormData) => {
    if (!shopId || typeof shopId !== 'string') {
      alert('가게 ID가 유효하지 않습니다.');
      return;
    }

    try {
      await editShop(shopId, formData);
      setModalMessage('수정이 완료되었습니다!');
      setRedirectPath(`/owner/my-shop`);
      setModalOpen(true);
    } catch (error) {
      handleError(error);
    }
  };

  const handleConfirm = () => {
    setModalOpen(false);
    if (redirectPath) {
      router.push(redirectPath);
    }
  };

  if (!shopDetails) {
    return <ShopFormSkeleton />;
  }

  return (
    <>
      <ShopCommonForm mode="edit" onSubmit={handleEditSubmit} initialData={shopDetails} />
      <Modal isOpen={modalOpen} onClose={handleConfirm}>
        {modalMessage}
      </Modal>
    </>
  );
}
