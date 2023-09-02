import './navigation.css';
import 'material-symbols';
import 'material-icons/iconfont/material-icons.css';
import type { Metadata } from 'next';
import { Lato, Bebas_Neue } from 'next/font/google';
import Navigation from './_components/Navigation';
import TopBar from './_components/TopBar';
import AuthProvider from '../AuthProvider';
import ResumeWorkout from './_components/ResumeWorkout';

export const lato = Lato({ weight: '400', subsets: ['latin'] });
export const bebas_neue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  title: 'Weightly',
  description: 'Gym progress tracking app.',
};

const navLinks = [
  { href: '/home', name: 'Home', symbol: 'home' },
  { href: '/workout', name: 'Workout', symbol: 'exercise' },
  { href: '/profile', name: 'Profile', symbol: 'person' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${lato.className} ${bebas_neue.variable} bg-stone-900`}
        >
          <TopBar />
          <ResumeWorkout />
          <Navigation navLinks={navLinks} />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
