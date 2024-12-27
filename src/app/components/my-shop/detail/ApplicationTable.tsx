import { NoticeApplication } from '@/app/types/Shop';
import StatusLabel from '@/app/components/my-shop/detail/StatusLabel';

export default function ApplicationTable({
  applications,
  token,
  shopId,
  noticeId,
}: {
  applications: NoticeApplication[];
  token: string;
  shopId: string;
  noticeId: string;
}) {
  return (
    <>
      <table className="w-full text-left">
        <thead className="bg-red-10">
          <tr>
            <th className="th w-[40%] sm:w-[25%] md:w-[18%]">신청자</th>
            <th className="th hidden w-[32%] sm:table-cell md:w-[30%]">소개</th>
            <th className="th hidden w-[21%] md:table-cell">전화번호</th>
            <th className="th w-full md:w-[25%]">상태</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.item.id} className="border-b py-5">
              <td className="td">{application.item.user.item.name || '비공개'}</td>
              <td className="td hidden sm:table-cell">
                {application.item.user.item.bio || '잘 부탁드립니다.'}
              </td>
              <td className="td hidden md:table-cell">
                {application.item.user.item.phone || '010-****-****'}
              </td>
              <td className="td pr-7">
                <StatusLabel
                  initialstatus={application.item.status}
                  type="employer"
                  token={token}
                  shopId={shopId}
                  noticeId={noticeId}
                  applicationId={application.item.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
