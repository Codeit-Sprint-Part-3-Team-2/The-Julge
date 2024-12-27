import { User } from './Auth';

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  bio: string;
}

export interface ProfileResponse {
  item: User;
  links: [];
}

interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface Notice {
  id: string;
  hourlyPay: number;
  description: string;
  startsAt: string;
  workhour: number;
  closed: boolean;
}

interface UserApplicationItem {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
  shop: {
    item: Shop;
    href: string;
  };
  notice: {
    item: Notice;
    href: string;
  };
}

export interface UserApplication {
  item: UserApplicationItem;
  links: Array<{
    rel: string;
    description: string;
    method: string;
    href: string;
  }>;
}

