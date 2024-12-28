import { NoticeItem, ApiResponse, NoticeDetail, ApplicationResponse } from '../types/Notice';
import API from './register-api';

export const fetchNotices = async (
  currentPage: number,
  itemsPerPage: number,
  sortOption: string,
  filterOptions: { locations: string[]; startDate: string; amount: string },
  keyword?: string
): Promise<{ items: NoticeItem[]; count: number }> => {
  try {
    let url = `/notices?offset=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}&sort=${sortOption}`;

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

    const response = await API.get<ApiResponse<NoticeItem>>(url);
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
  const response = await API.get<{ item: NoticeDetail }>(`/shops/${shopId}/notices/${noticeId}`);
  return response.data.item;
};

export const fetchApplicationId = async (shopId: string, noticeId: string) => {
  const response = await API.get<ApplicationResponse>(
    `/shops/${shopId}/notices/${noticeId}/applications`,
    {}
  );

  const application = response.data.items.find((app) => app.item.status !== 'canceled');
  return application ? application.item.id : null;
};

export const applyForNotice = async (shopId: string, noticeId: string) => {
  await API.post(`/shops/${shopId}/notices/${noticeId}/applications`, {}, {});
};

export const cancelApplication = async (
  shopId: string,
  noticeId: string,
  applicationId: string
) => {
  await API.put(
    `/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    { status: 'canceled' },
    {}
  );
};
