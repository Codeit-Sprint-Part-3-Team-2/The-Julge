import Image from 'next/image';

export default function Information({
  fontSize,
  textColor,
  name,
  value,
  imageSrc,
}: {
  fontSize: string;
  textColor: string;
  name: string;
  value: string;
  imageSrc: string;
}) {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="relative flex h-4 w-5 items-center justify-center sm:h-5">
          <Image fill src={imageSrc} alt={name} sizes={`(max-width: 640px) 20px`} />
        </div>
        <span className={`${fontSize} ${textColor}`}>{value}</span>
      </div>
    </>
  );
}
