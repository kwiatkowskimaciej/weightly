import './workout.css';
import 'material-symbols';
import 'material-icons/iconfont/material-icons.css';
import type { Metadata } from 'next';
import { Lato, Bebas_Neue } from 'next/font/google';
import AuthProvider from '../AuthProvider';

export const lato = Lato({ weight: '400', subsets: ['latin'] });
export const bebas_neue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  title: 'Weightly - Quick workout',
  description: 'New quick workout.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${lato.className} ${bebas_neue.variable} bg-stone-50`}>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}

