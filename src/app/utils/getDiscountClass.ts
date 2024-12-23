export default function getDiscountClass(increaseRate: string): string {
  const discountValue = parseInt(increaseRate, 10);
  return discountValue >= 50
    ? 'bg-red-40 text-white'
    : discountValue >= 30
      ? 'bg-red-30 text-white'
      : 'bg-red-20 stext-white';
}
