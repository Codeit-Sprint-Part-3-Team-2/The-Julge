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


