import { create } from 'zustand';
import { instance } from '@/app/api/api';
import { Auth, AuthResponse, AuthStore } from '@/app/types/Auth';
import { persist } from 'zustand/middleware';

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      userId: null,
      type: null,
      token: null,
      profileRegistered: false,
      isInitialized: false,

      initialize: () => {
        const storedToken = localStorage.getItem('accessToken');
        const storedUserId = localStorage.getItem('userId');
        set({
          token: storedToken || null,
          userId: storedUserId || null,
          isInitialized: true,
        });
      },

      setProfileRegistered: (status: boolean) => {
        set({ profileRegistered: status });
      },

      getMe: async () => {
        const token = get().token;
        const userId = get().userId;

        if (!token || !userId) {
          set({ user: null, type: null });
          throw new Error('토큰 또는 사용자 ID가 없습니다.');
        }

        try {
          const response = await instance.get(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          set({
            user: response.data.item,
            type: response.data.item.type,
            profileRegistered: response.data.item.profileRegistered,
          });

          return response.data;
        } catch (error) {
          console.error('getMe 실패:', error);
          set({ user: null, type: null, profileRegistered: false });
          throw new Error('내 정보 가져오기에 실패했습니다.');
        }
      },

      signup: async (data: Auth): Promise<AuthResponse> => {
        const response = await instance.post('/users', data);
        return response.data;
      },

      login: async (data: Auth): Promise<AuthResponse> => {
        const response = await instance.post('/token', data);

        set({
          token: response.data.item.token,
          userId: response.data.item.user.item.id,
        });
        localStorage.setItem('accessToken', response.data.item.token);
        localStorage.setItem('userId', response.data.item.user.item.id);

        try {
          await get().getMe();
        } catch (error) {
          console.error('로그인 후 getMe 실패:', error);
          throw new Error('로그인 후 사용자 정보를 가져오지 못했습니다.');
        }

        try {
          await get().getMe();
        } catch (error) {
          console.error('로그인 후 getMe 실패:', error);
          throw new Error('로그인 후 사용자 정보를 가져오지 못했습니다.');
        }
        return response.data;
      },

      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');

        set({
          user: null,
          userId: null,
          type: null,
          token: null,
          profileRegistered: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
