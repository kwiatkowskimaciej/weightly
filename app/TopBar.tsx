'use client';

import MonthCalendar from '@/components/MonthCalendar/MonthCalendar';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function TopBar() {
  const pathname = usePathname().slice(1);
  const [show, setShow] = useState(false)

  return (
    <div className="flex items-center justify-between w-full h-16 px-4 text-4xl font-header text-stone-50 bg-stone-900 sm:pl-24 xl:pl-[376px] sm:pt-3 sm:mb-3">
      <span>{pathname}</span>
      <div className="flex items-center gap-6">
        <span key={'search'} className="material-symbols-outlined">
          search
        </span>
        <span key={'calendar_month'} className="material-symbols-outlined" onClick={() => setShow(!show)}>
          calendar_month
        </span>
        <MonthCalendar show={show} setShow={setShow} />
        {pathname === 'profile' && (
          <span className="material-symbols-outlined">settings</span>
        )}
      </div>
    </div>
  );
}
