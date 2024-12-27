import { create } from 'zustand';

interface ModalShopStore {
  modalOpen: boolean;
  modalMessage: string;
  modalFunction: () => void;
  redirectPath: string;
  setModalOpen: (isOpen: boolean) => void;
  setModalMessage: (message: string) => void;
  setModalFunction: (func: () => void) => void;
  setRedirectPath: (path: string) => void;
}

export const useModalShopStore = create<ModalShopStore>((set) => ({
  modalOpen: false,
  modalMessage: '',
  redirectPath: '',
  modalFunction: () => {},
  setModalOpen: (isOpen) => set({ modalOpen: isOpen }),
  setModalMessage: (message) => set({ modalMessage: message }),
  setModalFunction: (func) => set({ modalFunction: func }),
  setRedirectPath: (path) => set({ redirectPath: path }),
}));
