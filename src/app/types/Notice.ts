export interface ShopItem {
  id: string;
  name: string;
  address1: string;
  imageUrl: string;
  originalHourlyPay: number;
  category?: string;
  description?: string;
}

export interface NoticeItem {
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

export interface ApiResponse<T> {
  items: { item: T }[];
  count?: number;
  hasNext?: boolean;
}

export interface AllNoticesProps {
  currentPage: number;
  itemsPerPage: number;
  setTotalItems: (total: number) => void;
  sortOption: string;
  filterOptions: { locations: string[]; startDate: string; amount: string };
  query?: string;
}

export interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  variant?: 'alert' | 'confirm';
}

export interface Application {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
}

export interface ApplicationResponse {
  items: { item: Application }[];
}

export interface NoticeDetail {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: ShopItem;
  };
}

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}
