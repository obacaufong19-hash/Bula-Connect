import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bula Connect - Authentic Fiji Experiences',
  description: 'Book village stays, explore hidden gems, and learn Fijian culture - offline ready',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
