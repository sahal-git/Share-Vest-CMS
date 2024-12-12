import { ReactNode } from 'react';

export const metadata = {
  title: 'ShareVest Admin',
  description: 'Course management platform for ShareVest',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 