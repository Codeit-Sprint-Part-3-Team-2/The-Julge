import { Shop } from './Shop';

export interface Auth {
  email: string;
  password: string;
  type?: 'employer' | 'employee';
}

export interface User {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name: string;
  phone: string;
  address: string;
  bio: string;
  shop: null | {
    item: Shop;
  };
}

export interface AuthResponse {
  item: User[];
  links: [];
}
