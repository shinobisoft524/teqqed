import './globals.css';
import Providers from './providers';
import type React from 'react';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
