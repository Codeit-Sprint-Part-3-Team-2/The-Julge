import axios, { AxiosError } from 'axios';

// axios 인스턴스 생성
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // 로컬스토리지에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 가게 등록 API
export const registerShop = async (shopData: {
  name: string;
  category: string;
  address1: string;
  address2: string;
  originalHourlyPay: number;
  imageUrl?: string;
  description: string;
}) => {
  try {
    const response = await API.post('/shops', shopData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error, '가게 등록');
  }
};

// 가게 정보 수정 API
export const editShop = async (
  shopId: string,
  updatedData: {
    name?: string;
    category?: string;
    address1?: string;
    address2?: string;
    originalHourlyPay?: number;
    imageUrl?: string;
    description?: string;
  }
) => {
  try {
    const response = await API.put(`/shops/${shopId}`, updatedData);
    if (response.status === 200) {
      console.log('가게 정보 수정 성공:', response.data);
      return response.data;
    }
  } catch (error) {
    handleApiError(error, '가게 정보 수정');
  }
};

// 가게 정보 조회 API
export const getShopDetails = async (shopId: string) => {
  try {
    const response = await API.get(`/shops/${shopId}`);
    if (response.status === 200) {
      console.log('가게 정보 조회 성공:', response.data);
      return response.data;
    }
  } catch (error) {
    handleApiError(error, '가게 정보 조회');
  }
};

// Presigned URL을 얻기 위한 API
export const presignedImg = async (fileName: string): Promise<string> => {
  try {
    const response = await API.post('/images', { name: fileName });
    return response.data.item.url;
  } catch (error) {
    console.error('이미지 URL 생성 실패:', error);
    throw new Error('이미지 URL 생성에 실패했습니다.');
  }
};

// S3에 이미지 업로드
export const uploadToS3 = async (presignedUrl: string, file: File) => {
  try {
    await axios.put(presignedUrl, file);
    return presignedUrl;
  } catch (error) {
    console.error('S3 업로드 실패:', error);
    throw new Error('이미지 업로드 실패');
  }
};

// 에러 처리 함수
function handleApiError(error: unknown, operation: string) {
  if (error instanceof AxiosError) {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
      } else if (error.response.status === 403) {
        console.error('권한이 없습니다.');
      } else if (error.response.status === 404) {
        console.error('존재하지 않는 가게입니다.');
      } else if (error.response.status === 409) {
        console.error('이미 등록한 가게가 있습니다.');
        alert('이미 등록된 가게입니다.');
      } else {
        console.error('서버 오류:', error.response.status);
      }
    } else {
      console.error('응답 오류:', error.message);
    }
  } else {
    console.error('일반 오류:', error);
  }
  throw new Error(`${operation}에 실패했습니다.`);
}

export default API;
