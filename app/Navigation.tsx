'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Link {
  href: string;
  name: string;
  symbol: string;
}

interface NavigationProps {
  navLinks: Link[];
}

export default function Navigation({ navLinks }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full h-20 bg-stone-900 text-stone-50 text-xs sm:w-20 sm:h-full sm:flex sm:items-center xl:w-[360px] xl:items-start">
      <ul className="flex justify-around gap-2 pt-3 mx-2 sm:flex-col sm:gap-3 sm:mx-3 xl:gap-3">
        <div className="items-center hidden mx-4 h-14 xl:flex">
          <span className="text-2xl font-header">Weightly</span>
        </div>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.name} className="grow">
              <Link
                href={link.href}
                key={link.name}
                className="flex flex-col items-center w-full xl:flex-row"
              >
                <div
                  className={
                    'mx-auto mb-1 h-8 w-16 rounded-full flex items-center justify-center sm:w-14 xl:w-[336px] xl:justify-start xl:pl-4 xl:h-14 xl:mb-0 ' +
                    (isActive ? 'bg-lime-300 text-stone-900' : 'text-stone-50')
                  }
                >
                  <span className="material-symbols-outlined">
                    {link.symbol}
                  </span>
                </div>
                <span
                  className={
                    'block xl:absolute xl:left-16 ' +
                    (isActive ? 'xl:text-stone-900' : 'text-stone-50')
                  }
                >
                  {link.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
