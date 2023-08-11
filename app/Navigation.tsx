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
    <nav className="fixed bottom-0 w-full h-20 bg-stone-900 text-stone-50 text-xs">
      <ul className="flex mx-2 gap-2 pt-3 justify-around">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li className="grow">
              <Link
                href={link.href}
                key={link.name}
                className="flex flex-col items-center w-full"
              >
                <div
                  className={
                    'mx-auto mb-1 h-8 w-16 rounded-full flex items-center justify-center ' +
                    (isActive ? 'bg-lime-300 text-stone-900' : 'text-stone-50')
                  }
                >
                  <span className="material-symbols-outlined">
                    {link.symbol}
                  </span>
                </div>
                <span className="block">{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
