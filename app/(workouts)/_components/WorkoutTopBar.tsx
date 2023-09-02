'use client';

import { addWorkout } from '@/app/(workouts)/actions';
import { Back, WorkoutBack } from '@/components/buttons';
import { useRouter } from 'next/navigation';
import { IWorkout } from '../types';
import { revalidatePath } from 'next/cache';

interface Props {
  workout: IWorkout;
  start: boolean;
  preview?: boolean;
  inProgress?: boolean;
}

export default function WorkoutTopBar({
  workout,
  start,
  preview,
  inProgress,
}: Props) {
  const router = useRouter();
  return (
    <div className="w-full h-16 px-4 bg-stone-900 text-stone-50 flex items-center justify-between border-b border-blue-400">
      <div className="flex items-center gap-4">
        {start ? <WorkoutBack workout={workout} /> : <Back />}
        <span className="font-header text-2xl mt-1">
          {preview ? 'Workout details' : 'New workout'}
        </span>
      </div>
      {start && (
        <button
          className="flex items-center bg-lime-300 px-6 rounded-full h-10 font-bold text-stone-900"
          onClick={() => {
            addWorkout({ data: workout, save: false, inProgress: false });
            router.push('/workout');
          }}
        >
          Finish
        </button>
      )}
      {!start && !preview && (
        <button
          className="flex items-center bg-lime-300 px-6 rounded-full h-10 font-bold text-stone-900"
          onClick={() => {
            addWorkout({ data: workout, save: true });
            router.push('/workout');
          }}
        >
          Save
        </button>
      )}
    </div>
  );
}
