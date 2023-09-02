'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Plans from './Plans';
import Individual from './Individual';

interface Workout {
  id: string;
  name: string;
  date: Date;
  userId: string;
  planId: string | null;
  _count: {
    exercises: number;
  };
}

interface Plan {
  id: string;
  name: string;
  start: Date;
  duration: number;
  current: boolean;
  nextWorkoutId: string;
  userId: string;
  _count: {
    workouts: number;
  };
}

interface Props {
  workouts: Workout[];
  plans: Plan[];
}

export default function Tabs({ workouts, plans }: Props) {
  const [openPlans, setOpenPlans] = useState(true);

  return (
    <>
      <div className="h-12 border-b border-stone-700 flex items-center text-stone-50">
        <div
          className="w-1/2 h-full flex flex-col items-center justify-end"
          onClick={() => setOpenPlans(true)}
        >
          <div className={twMerge('pb-[9px]', openPlans && 'text-lime-300')}>
            Plans
          </div>
          <div
            className={twMerge(
              'h-[3px] w-[30px] rounded-t-[3px]',
              openPlans && 'bg-lime-300'
            )}
          ></div>
        </div>
        <div
          className="w-1/2 h-full flex flex-col items-center justify-end"
          onClick={() => setOpenPlans(false)}
        >
          <div className={twMerge('pb-[9px]', !openPlans && 'text-lime-300')}>
            Individual
          </div>
          <div
            className={twMerge(
              'h-[3px] w-[30px] rounded-t-[3px]',
              !openPlans && 'bg-lime-300'
            )}
          ></div>
        </div>
      </div>
      <div className={openPlans ? '' : 'hidden'}>
        <Plans plans={plans} />
      </div>
      <div className={openPlans ? 'hidden' : ''}>
        <Individual workouts={workouts} />
      </div>
    </>
  );
}
