import axios from 'axios';
import { NoticeItem, ApiResponse, NoticeDetail, ApplicationResponse } from '../types/Notice';

const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
// 후에 제거할 토큰!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export const fetchNotices = async (
  currentPage: number,
  itemsPerPage: number,
  sortOption: string,
  filterOptions: { locations: string[]; startDate: string; amount: string },
  keyword?: string
): Promise<{ items: NoticeItem[]; count: number }> => {
  try {
    let url = `https://bootcamp-api.codeit.kr/api/11-2/the-julge/notices?offset=${
      (currentPage - 1) * itemsPerPage
    }&limit=${itemsPerPage}&sort=${sortOption}`;

    if (filterOptions.locations.length > 0) {
      filterOptions.locations.forEach((location) => {
        url += `&address=${encodeURIComponent(location)}`;
      });
    }

    if (filterOptions.startDate) {
      const date = new Date(filterOptions.startDate);
      const formattedDate = date.toISOString();
      url += `&startsAtGte=${formattedDate}`;
    }

    if (filterOptions.amount) {
      url += `&hourlyPayGte=${filterOptions.amount}`;
    }

    if (keyword) {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }

    const response = await axios.get<ApiResponse<NoticeItem>>(url);
    const formattedData = response.data.items.map((data: { item: NoticeItem }) => ({
      ...data.item,
      shopId: data.item.shop.item.id,
    }));

    return { items: formattedData, count: response.data.count || 0 };
  } catch (error) {
    console.error('Error fetching notices:', error);
    throw new Error('Failed to fetch notices');
  }
};

export const fetchNoticeDetail = async (shopId: string, noticeId: string) => {
  const response = await axios.get<{ item: NoticeDetail }>(
    `https://bootcamp-api.codeit.kr/api/11-2/the-julge/shops/${shopId}/notices/${noticeId}`
  );
  return response.data.item;
};

export const fetchApplicationId = async (shopId: string, noticeId: string) => {
  const response = await axios.get<ApplicationResponse>(
    `https://bootcamp-api.codeit.kr/api/11-2/the-julge/shops/${shopId}/notices/${noticeId}/applications`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );

  const application = response.data.items.find((app) => app.item.status !== 'canceled');
  return application ? application.item.id : null;
};

export const applyForNotice = async (shopId: string, noticeId: string) => {
  await axios.post(
    `https://bootcamp-api.codeit.kr/api/11-2/the-julge/shops/${shopId}/notices/${noticeId}/applications`,
    {},
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );
};

export const cancelApplication = async (
  shopId: string,
  noticeId: string,
  applicationId: string
) => {
  await axios.put(
    `https://bootcamp-api.codeit.kr/api/11-2/the-julge/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    { status: 'canceled' },
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );
};
