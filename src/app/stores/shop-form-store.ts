import { create } from 'zustand';

interface ShopFormData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  originalHourlyPay: number;
  imageUrl?: string;
  description: string;
  file: File | null;
  previewUrl: string | null;
  setName: (name: string) => void;
  setCategory: (category: string) => void;
  setAddress1: (address1: string) => void;
  setAddress2: (address2: string) => void;
  setOriginalHourlyPay: (wage: number) => void;
  setDescription: (description: string) => void;
  setFile: (file: File | null) => void;
  setPreviewUrl: (url: string | null) => void;
  clearImage: () => void;
}

export const useShopStore = create<ShopFormData>((set) => ({
  name: '',
  category: '',
  address1: '',
  address2: '',
  originalHourlyPay: 0,
  description: '',
  file: null,
  previewUrl: null, // 초기값을 null로 설정
  setName: (name) => set({ name }),
  setCategory: (category) => set({ category }),
  setAddress1: (address1) => set({ address1 }),
  setAddress2: (address2) => set({ address2 }),
  setOriginalHourlyPay: (wage) => set({ originalHourlyPay: wage }),
  setDescription: (description) => set({ description }),
  setFile: (file) => set({ file }),
  setPreviewUrl: (url) => set({ previewUrl: url }),
  clearImage: () => set({ file: null, previewUrl: null }),
}));
