'use client';

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Discard } from '@/components/buttons';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { IWorkout } from '@/app/(workouts)/types';
import { useRouter } from 'next/navigation';

export default function ResumeWorkout() {
  const [workout, setWorkout] = useState<IWorkout>();
  const router = useRouter();

  useEffect(() => {
    fetchWorkout();
  }, []);

  const fetchWorkout = async () => {
    try {
      const response = await fetch('/api/resume', { next: { revalidate: 0 } });
      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }
      const data = await response.json();
      setWorkout(data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  if (!workout) {
    return <></>;
  }

  return (
    <div
      className={twMerge(
        'fixed z-10 bottom-20 w-full flex-col items-center text-stone-50 bg-stone-800 p-4 rounded-t-2xl',
        workout ? 'flex' : 'hidden'
      )}
    >
      <div>Workout in progress</div>
      <div className="w-full flex mt-4 justify-around">
        <Link href={`/workout-log/resume/${workout.id}`}>
          <button className="pl-4 pr-6 flex items-center justify-center bg-stone-800 rounded-full border border-lime-300 h-10 font-bold text-lime-300">
            <span className="material-symbols-outlined">resume</span>Resume
          </button>
        </Link>
        <div>
          <Discard workoutId={workout.id} />
        </div>
      </div>
    </div>
  );
}
