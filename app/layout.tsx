import './globals.css';
import 'material-symbols';
import 'material-icons/iconfont/material-icons.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from './Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weightly',
  description: 'Gym progress tracking app.',
};

const navLinks = [
  { href: '/', name: 'Home', symbol: 'home' },
  { href: '/workout', name: 'Workout', symbol: 'exercise' },
  { href: '/profile', name: 'Profile', symbol: 'person' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation navLinks={navLinks} />
        {children}
      </body>
    </html>
  );
}
