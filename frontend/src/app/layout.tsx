import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { Metadata } from 'next';
import Navbar from '@/components/common/Navbar';
import ThemeRegistry from '@/components/theme/ThemeRegistry';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <ThemeRegistry options={{ key: 'mui' }}>
            <div>
              <Navbar />
              {children}
            </div>
          </ThemeRegistry>
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
