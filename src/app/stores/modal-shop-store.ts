import { create } from 'zustand';

interface ModalShopStore {
  modalOpen: boolean;
  modalMessage: string;
  redirectPath: string;
  setModalOpen: (isOpen: boolean) => void;
  setModalMessage: (message: string) => void;
  setRedirectPath: (path: string) => void;
}

export const useModalShopStore = create<ModalShopStore>((set) => ({
  modalOpen: false,
  modalMessage: '',
  redirectPath: '',
  setModalOpen: (isOpen) => set({ modalOpen: isOpen }),
  setModalMessage: (message) => set({ modalMessage: message }),
  setRedirectPath: (path) => set({ redirectPath: path }),
}));
