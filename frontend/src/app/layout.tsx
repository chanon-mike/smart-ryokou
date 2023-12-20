import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { Metadata } from 'next';
import Navbar from '@/components/common/Navbar';
import ThemeRegistry from '@/components/theme/ThemeRegistry';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';
import createTranslation from 'next-translate/useTranslation';
import { SnackbarProvider } from '@/components/common/snackbar/SnackbarContext';

export const metadata: Metadata = {
  title: 'Smart旅行',
  description:
    'Smart旅行は、ユーザーの入力に基づいて最適な旅行プランを提案するアプリです。場所、日程、予算、趣味などの情報を入力するだけで、個人に合わせた旅行プランをAIが作成します。直感的なインターフェースで簡単にカスタマイズでき、友達や家族との共有も可能です。Smart旅行で、あなただけの特別な旅行体験を。',
  openGraph: {
    type: 'website',
    title: 'Smart旅行 - AIによる旅行プランナー',
    description:
      'このアプリは、ユーザーの入力に基づいて最適な旅行プランを提案するアプリです。Smart旅行で、あなただけの特別な旅行体験を。',
    url: 'https://smart-ryokou.vercel.app',
    images: [
      {
        url: 'https://smart-ryokou.vercel.app/website.png',
        width: 800,
        height: 600,
        alt: 'Smart旅行',
      },
    ],
    siteName: 'Smart旅行',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { lang } = createTranslation('common');

  return (
    <html lang={lang}>
      <head>
        <GoogleAnalytics />
        <link href="https://fonts.googleapis.com/css?family=Sawarabi+Gothic" rel="stylesheet" />
      </head>
      <UserProvider>
        <body>
          <SnackbarProvider>
            <ThemeRegistry options={{ key: 'mui' }}>
              <div>
                <Navbar />

                {children}
              </div>
            </ThemeRegistry>
          </SnackbarProvider>
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
