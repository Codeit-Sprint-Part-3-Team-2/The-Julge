import { create } from 'zustand';

interface ShopItem {
  id: string;
  name: string;
  address1: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface NoticeItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: ShopItem;
  };
  shopId: string;
}

interface RecentNoticesState {
  recentNotices: NoticeItem[];
  addNotice: (notice: NoticeItem) => void;
  clearNotices: () => void;
}

const MAX_RECENT_NOTICES = 6;

export const useRecentNoticesStore = create<RecentNoticesState>((set) => ({
  recentNotices: [],

  addNotice: (notice) =>
    set((state) => {
      const updatedNotices = [
        notice,
        ...state.recentNotices.filter((item) => item.id !== notice.id),
      ].slice(0, MAX_RECENT_NOTICES);

      return { recentNotices: updatedNotices };
    }),

  clearNotices: () => set({ recentNotices: [] }),
}));
