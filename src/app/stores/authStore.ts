import { create } from 'zustand';
import { instance } from '@/app/api/api';
import { Auth, AuthResponse, AuthStore } from '@/app/types/Auth';

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  userId: null,

  getMe: async () => {
    const token = localStorage.getItem('token');
    const userId = get().userId;

    if (!token || !userId) {
      return set({ user: null });
    }

    const response = await instance.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    set({ user: response.data.item });

    return response.data;
  },

  signup: async (data: Auth): Promise<AuthResponse> => {
    const response = await instance.post('/users', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  },

  login: async (data: Auth): Promise<AuthResponse> => {
    const response = await instance.post('/token', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.setItem('token', response.data.item.token);
    set({ userId: response.data.item.user.item.id });

    await get().getMe();

    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');

    set({ user: null });
    set({ userId: null });
  },
}));

export default useAuthStore;
