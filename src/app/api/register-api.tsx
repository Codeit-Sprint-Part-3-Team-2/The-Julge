import axios from 'axios';
import { AxiosError } from 'axios';
const token = process.env.NEXT_PUBLIC_API_TOKEN;

// axios 인스턴스 생성
const API = axios.create({
  baseURL: 'https://bootcamp-api.codeit.kr/api/11-2/the-julge', // 엔드포인트 설정
  headers: {
    'Content-Type': 'application/json', // 기본 Content-Type 설정
    Authorization: `Bearer ${token}`,
  },
});

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
    // 성공적으로 가게가 등록된 경우
    if (response.status === 200) {
      console.log('가게 등록 성공:', response.data);
      return response.data; // 성공 데이터 반환
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
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

    throw new Error('가게 등록에 실패했습니다.');
  }
};

// Presigned URL을 얻기 위한 API
export const presignedImg = async (fileName: string): Promise<string> => {
  try {
    // 로컬 스토리지에서 토큰을 가져옴
    if (!token) {
      throw new Error('로그인 후 다시 시도해 주세요.');
    }

    // Presigned URL 생성 요청
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
