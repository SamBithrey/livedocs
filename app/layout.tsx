import { Inter as FontSans } from 'next/font/google';

import './globals.css';

import { cn } from '@/lib/utils';
import { Metadata } from 'next';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'LiveDocs',
  description: 'Collaborative Editor',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        {children}
      </body>
    </html>
  );
}
