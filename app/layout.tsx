import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShareVest Course Management',
  description: 'Modern course management platform for ShareVest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b bg-primary/5">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold flex items-center gap-2 text-primary">
              <Leaf className="h-6 w-6" />
              ShareVest Courses
            </Link>
            <div className="flex gap-4">
              <Link href="/">
                <Button variant="ghost">Courses</Button>
              </Link>
              <Link href="/api-tester">
                <Button variant="ghost">API Tester</Button>
              </Link>
              <Link href="/docs">
                <Button variant="ghost">API Docs</Button>
              </Link>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
          {children}
        </main>
      </body>
    </html>
  );
}