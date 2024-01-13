import type { ReactNode } from 'react';

import { I18nProvider } from '@/components/common/I18nProvider';

const Layout = ({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}) => {
  return <I18nProvider locale={locale}>{children}</I18nProvider>;
};

export default Layout;
