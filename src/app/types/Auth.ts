export interface Auth {
  email: string;
  password: string;
  type?: 'employer' | 'employee';
}

export interface Shop {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export interface User {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  shop?: {
    item: Shop | null;
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
  getMe: () => void;
  signup: (data: Auth) => Promise<AuthResponse>;
  login: (data: Auth) => Promise<AuthResponse>;
  logout: () => void;
}
