import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* 내 가게 정보를 가져오는 API */
/** @param shopId 가게 ID */
/** @returns 가게 정보 */

const getMyShop = async (shopId: string) => {
  const response = await instance.get(`/shops/${shopId}`);
  return response.data;
};

/* 가게의 공고를 등록하는 API */
/** @param token 토큰 */
/** @param shopId 가게 ID */
/** @param noticeData 공고 데이터 */
/** @returns 공고 데이터 */

const postShopNotice = async (
  token: string,
  shopId: string,
  noticeData: {
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
  }
) => {
  const response = await instance.post(`/shops/${shopId}/notices`, noticeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/* 가게의 공고를 가져오는 API */
/** @param shopId 가게 ID */
/** @param page 페이지 번호 */
/** @param limit 페이지 당 공고 수 */
/** @returns 공고 목록 */

const getShopNotices = async (shopId: string, offset: number = 1, limit: number = 100) => {
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

export { instance, getMyShop, getShopNotices, postShopNotice, getNoticeDetail };
