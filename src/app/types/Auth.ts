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

export interface AuthStore {
  user: User | null;
  userId: string | null;
  type: 'employee' | 'employer' | null;
  token: string | null;
  profileRegistered: boolean | null;
  isInitialized: boolean;
  setProfileRegistered: (status: boolean) => void;

  getMe: () => void;
  signup: (data: Auth) => Promise<AuthResponse>;
  login: (data: Auth) => Promise<AuthResponse>;
  logout: () => void;
  initialize: () => void;
}
