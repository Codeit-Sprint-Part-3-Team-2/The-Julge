import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './styles/globals.css';
import Footer from './components/layout/Footer';
import Header from './components/navigation/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '11-2팀 더줄게',
  description: 'The Julge는 일자리 검색과 매칭, 시급 기반 추천 기능을 제공하는 웹 서비스입니다.',
  keywords: '중급프로젝트, 프론트앤드 11기 2팀, 더줄게, 코드잇',
  openGraph: {
    siteName: '11-2팀 더줄게',
    title: '11-2팀 더줄게',
    type: 'website',
    description: 'The Julge는 일자리 검색과 매칭, 시급 기반 추천 기능을 제공하는 웹 서비스입니다.',
    images: [
      {
        url: 'https://the-julge-team-2.vercel.app/meta/sum-meta.png',
        alt: '더줄게 메타 이미지',
      },
    ],
    url: 'https://the-julge-team-2.vercel.app/',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //헤더 없는 페이지
  const hiddenPaths = ['/login', '/signup'];

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="h-auto min-h-full pb-32 sm:pb-[100px]">
          <Header hiddenPaths={hiddenPaths} />
          {children}
        </div>
        <Footer hiddenPaths={hiddenPaths} />
      </body>
    </html>
  );
}
