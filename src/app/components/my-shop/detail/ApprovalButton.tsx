export default function ApprovalButton({
  approve,
  onClick,
}: {
  approve: boolean;
  onClick: () => Promise<void>;
}) {
  const isApprove = approve
    ? { content: '승인하기', style: 'border-blue-20 text-blue-20' }
    : { content: '거절하기', style: 'border-red-40 text-red-40' };

  const handleOnClick = async () => {
    const isConfirmed = window.confirm('신청을 처리하시겠습니까?');

    if (isConfirmed) {
      await onClick();
    }
  };

  return (
    <button className={`rounded-lg border px-5 py-2 ${isApprove.style}`} onClick={handleOnClick}>
      {isApprove.content}
    </button>
  );
}
