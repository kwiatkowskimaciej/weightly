'use client';

import { Back } from '@/components/buttons';

interface Props {
  name?: string;
}

export default function WorkoutTopBar({ name }: Props) {
  return (
    <div className="w-full h-16 px-4 bg-stone-900 text-stone-50 flex items-center justify-between border-b border-blue-400">
      <div className="flex items-center gap-4">
        <Back />
        <span className="font-header text-2xl mt-1">{name}</span>
      </div>
    </div>
  );
}
