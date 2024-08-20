import './globals.css';
import Providers from './providers';
import type React from 'react';
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-screen w-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
