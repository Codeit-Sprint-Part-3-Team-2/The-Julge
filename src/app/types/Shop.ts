export interface user {
  id: string;
  email: string;
  type: 'employee' | 'employer';
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

export interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user: {
    item: user;
    href: string;
  };
}

export interface Notice {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

export interface currentUserApplication {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
}

export interface NoticeDetail {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: Shop;
    href: string;
  };
  currentUserApplication: {
    item: currentUserApplication;
  };
}

export interface NoticeApplication {
  item: {
    id: string;
    createdAt: string;
    status: 'pending' | 'accepted' | 'rejected' | 'canceled';
    user: {
      item: user;
      href: string;
    };
    shop: {
      item: Shop;
      href: string;
    };
    notice: {
      item: Notice;
      href: string;
    };
  };
}

export interface PostNotice {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

export interface PostNoticeResponse {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: Shop;
    href: string;
  };
}
