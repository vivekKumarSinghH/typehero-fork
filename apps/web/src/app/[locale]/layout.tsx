import { Analytics } from '@vercel/analytics/react';

import '../../styles/globals.css';

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Toaster } from '@repo/ui/components/toaster';
import { Providers } from './providers';
import { buildMetaForDefault } from '../metadata';
import { Navigation } from '~/components/navigation';
import { getStaticParams } from '~/locales/server';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  return buildMetaForDefault({});
}

export function generateStaticParams() {
  return getStaticParams();
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta
          content="Level up your typescript skills with interactive exercises"
          name="description"
        />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} flex flex-col`}>
        <Providers locale={locale}>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
