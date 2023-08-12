'use client';

import { usePathname } from 'next/navigation';

export default function TopBar() {
  const pathname = usePathname().slice(1);

  return (
    <div className="flex items-center justify-between w-full h-16 px-4 text-4xl justi font-header text-stone-50 bg-stone-900 sm:pl-24 xl:pl-[376px]">
      <span>{pathname}</span>
      <div className="flex gap-6">
        <span key={'search'} className="material-symbols-outlined">
          search
        </span>
        <span key={'calendar_month'} className="material-symbols-outlined">
          calendar_month
        </span>
        {pathname === 'profile' && <span className="material-symbols-outlined">settings</span>}
      </div>
    </div>
  );
}
