import Link from 'next/link';

export default function AddPost({
  content,
  buttonLink,
  buttonText,
}: {
  content: string;
  buttonLink: string;
  buttonText: string;
}) {
  return (
    <div className="w-full rounded-lg border border-gray-20">
      <div className="flex flex-col items-center gap-4 py-16 md:gap-6">
        <p className="text-gray-black">{content}</p>
        <button className="buttonVer1 w-[9rem] md:w-[21rem]">
          <Link href={buttonLink}>{buttonText}</Link>
        </button>
      </div>
    </div>
  );
}
