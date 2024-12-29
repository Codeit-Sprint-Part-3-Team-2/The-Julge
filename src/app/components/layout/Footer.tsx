'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FooterProps {
  hiddenPaths: string[]; // 숨길 경로 리스트
}

export default function Footer({ hiddenPaths }: FooterProps) {
  const pathname = usePathname();
  const hiddenFooter = hiddenPaths.some((path) => pathname.startsWith(path));
  if (hiddenFooter) return null;

  return (
    <footer className="relative flex h-32 w-full translate-y-[-100%] bg-gray-10 text-gray-50 sm:h-[100px]">
      <div className="ml-5 mr-5 flex w-full justify-between gap-4 pt-7 sm:ml-8 sm:mr-8 sm:flex-row sm:items-center sm:gap-0 sm:p-0 lg:ml-56 lg:mr-56">
        <div className="flex w-7/12 flex-col gap-9 sm:flex-row sm:justify-between sm:gap-0">
          <div className="order-2 text-xs sm:order-1 sm:text-base">
            <span>©codeit - 2025</span>
          </div>

          <div className="order-1 flex gap-[30px] text-sm sm:order-2 sm:text-base">
            <Link href="/policy" className="hover:opacity-80">
              Privacy Policy
            </Link>
            <Link href="/FAQ" className="hover:opacity-80">
              FAQ
            </Link>
          </div>
        </div>

        <div className="order-3 flex gap-4">
          <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/SNS/email.svg"
              alt="Email"
              width={24}
              height={24}
              className="hover:opacity-80"
            />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/SNS/facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
              className="hover:opacity-80"
            />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/SNS/instagram.svg"
              alt="Instagram"
              width={24}
              height={24}
              className="hover:opacity-80"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
