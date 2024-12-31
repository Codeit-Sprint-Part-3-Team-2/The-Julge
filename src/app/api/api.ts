import axios from 'axios';
import { UserProfile } from '../types/Profile';
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
/* 가게의 공고를 등록하는 API */
/** @param token 토큰 */
/** @param shopId 가게 ID */
/** @param noticeData 공고 데이터 */
/** @returns 공고 데이터 */

const postShopNotice = async (
  token: string,
  shopId: string,
  data: {
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
  }
) => {
  const response = await instance.post(`/shops/${shopId}/notices`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/* 공고에 신청하는 API */
/** @param token 토큰 */
/** @param shopId 가게 ID */
/** @param noticeId 공고 ID */
/** @returns 신청 결과 */

const postNoticeApplication = async (token: string, shopId: string, noticeId: string) => {
  const response = await instance.post(`/shops/${shopId}/notices/${noticeId}/applications`, '', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/* 내 가게 정보를 가져오는 API */
/** @param shopId 가게 ID */
/** @returns 가게 정보 */

const getMyShop = async (shopId: string) => {
  const response = await instance.get(`/shops/${shopId}`);
  return response.data;
};

/* 가게의 공고를 가져오는 API */
/** @param shopId 가게 ID */
/** @param page 페이지 번호 */
/** @param limit 페이지 당 공고 수 */
/** @returns 공고 목록 */

const getShopNotices = async (shopId: string, offset: number = 0, limit: number = 100) => {
  const response = await instance.get(`/shops/${shopId}/notices`, {
    params: {
      offset,
      limit,
    },
  });
  return response.data;
};

/* 공고 상세 정보를 가져오는 API */
/** @param shopId 가게 ID */
/** @param noticeId 공고 ID */
/** @returns 공고 상세 정보 */

const getNoticeDetail = async (shopId: string, noticeId: string) => {
  const response = await instance.get(`/shops/${shopId}/notices/${noticeId}`);
  return response.data;
};

/* 공고에 신청한 사용자 목록을 가져오는 API */
/** @param shopId 가게 ID */
/** @param noticeId 공고 ID */
/** @param offset 페이지 번호 */
/** @param limit 페이지 당 신청자 수 */

const getNoticeApplications = async (
  shopId: string,
  noticeId: string,
  offset: number = 0,
  limit: number = 5
) => {
  const response = await instance.get(`/shops/${shopId}/notices/${noticeId}/applications`, {
    params: {
      offset,
      limit,
    },
  });
  return response.data;
};

/* 공고 신청을 처리하는 API */
/** @param token 토큰 */
/** @param shopId 가게 ID */
/** @param noticeId 공고 ID */
/** @param applicationId 신청 ID */
/** @param status 처리 결과 */

const putNoticeApplication = async (
  token: string,
  shopId: string,
  noticeId: string,
  applicationId: string,
  status: 'accepted' | 'rejected' | 'canceled'
) => {
  const response = await instance.put(
    `/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/* 공고 수정 API */
/** @param token 토큰 */
/** @param shopId 가게 ID */
/** @param noticeId 공고 ID */
/** @param data 수정할 공고 데이터 */

const putShopNotice = async (
  token: string,
  shopId: string,
  data: {
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
  },
  noticeId: string
) => {
  const response = await instance.put(`/shops/${shopId}/notices/${noticeId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 유저 프로필 업데이트
const updateUserProfile = async (token: string, userId: string, requestBody: UserProfile) => {
  const response = await instance.put(`/users/${userId}`, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 유저 지원 목록 조회
const getUserApplications = async (
  token: string,
  userId: string,
  offset: number = 0,
  limit: number = 100
) => {
  try {
    const response = await instance.get(`/users/${userId}/applications`, {
      params: { offset, limit },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('API 호출 오류', error);
    throw error;
  }
};

// 알림 목록 조회 API 
const getUserNotifications = async (
  token: string,
  userId: string,
  offset: number = 0,
  limit: number = 5
) => {
  try {
    const response = await instance.get(`/users/${userId}/alerts`, {
      params: { offset, limit },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('알림 목록 조회 실패', error);
    throw error;
  }
};

// 알림 읽음 처리 
const markNotification = async (token: string, userId: string, alertId: string) => {
  try {
    const response = await instance.put(
      `/users/${userId}/alerts/${alertId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('알림 읽음 처리 실패', error);
    throw error;
  }
};

export {
  instance,
  postShopNotice,
  postNoticeApplication,
  getMyShop,
  getShopNotices,
  getNoticeDetail,
  getNoticeApplications,
  putNoticeApplication,
  putShopNotice,
  updateUserProfile,
  getUserApplications,
  getUserNotifications,
  markNotification
};
