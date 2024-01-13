'use client';

import { Skeleton } from '@mui/material';
import type { ReactNode } from 'react';

import { I18nProviderClient } from '@/locales/client';

type I18nProviderProps = {
  locale: string;
  children: ReactNode;
};

export function I18nProvider({ locale, children }: I18nProviderProps) {
  return (
    <I18nProviderClient locale={locale} fallback={<Skeleton />}>
      {children}
    </I18nProviderClient>
  );
}
