'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MonthCalendar } from '@/components/MonthCalendar';

export default function TopBar() {
  const pathname = usePathname().slice(1);
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full h-16 px-4 text-4xl justi font-header text-stone-50 bg-stone-900 sm:pl-24 xl:pl-[376px] sm:pt-3 sm:mb-3">
      <span>{pathname}</span>
      <div className="flex gap-6">
        <span key={'search'} className="material-symbols-outlined">
          search
        </span>
        <button
          key={'calendar_month'}
          className="material-symbols-outlined"
          onClick={() => setIsOpen(true)}
        >
          calendar_month
        </button>
        {pathname === 'profile' && (
          <span className="material-symbols-outlined">settings</span>
        )}
      </div>
      <MonthCalendar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
