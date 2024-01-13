import './globals.css';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { Metadata } from 'next';

import GoogleAnalytics from '@/components/common/GoogleAnalytics';
import Navbar from '@/components/common/Navbar';
import { SnackbarProvider } from '@/components/common/snackbar/SnackbarContext';
import ThemeRegistry from '@/components/theme/ThemeRegistry';

export const metadata: Metadata = {
  title: 'Smart旅行',
  description:
    'Smart旅行は、ユーザーの入力に基づいて最適な旅行プランを提案するアプリです。場所、日程、予算、趣味などの情報を入力するだけで、個人に合わせた旅行プランをAIが作成します。直感的なインターフェースで簡単にカスタマイズでき、友達や家族との共有も可能です。Smart旅行で、あなただけの特別な旅行体験を。',
  metadataBase: new URL('https://smart-ryokou.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      ja: '/ja',
    },
  },
  openGraph: {
    type: 'website',
    title: 'Smart旅行 - AIによる旅行プランナー',
    description:
      'このアプリは、ユーザーの入力に基づいて最適な旅行プランを提案するアプリです。Smart旅行で、あなただけの特別な旅行体験を。',
    images: [
      {
        url: '/website.png',
        width: 1850,
        height: 1000,
        alt: 'Smart旅行',
      },
    ],
    siteName: 'Smart旅行',
  },
};

const RootLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  return (
    <html lang={locale}>
      <head>
        <GoogleAnalytics />
        <link href="https://fonts.googleapis.com/css?family=Sawarabi+Gothic" rel="stylesheet" />
      </head>
      <body>
        <UserProvider>
          <ThemeRegistry options={{ key: 'mui' }}>
            <SnackbarProvider>
              <div>
                <Navbar />

                {children}
              </div>
            </SnackbarProvider>
          </ThemeRegistry>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
