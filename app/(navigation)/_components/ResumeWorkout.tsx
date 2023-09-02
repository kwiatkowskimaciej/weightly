import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Discard } from '@/components/buttons';
import { twMerge } from 'tailwind-merge';

export default async function ResumeWorkout() {
  const workout = await prisma.workout.findMany({
    where: {
      inProgress: true,
    },
  });

  const workoutId = workout[0]?.id;

  return (
    <div
      className={twMerge(
        'fixed z-10 bottom-20 w-full flex-col items-center text-stone-50 bg-stone-800 p-4 rounded-t-2xl',
        workoutId ? 'flex' : 'hidden'
      )}
    >
      <div>Workout in progress</div>
      <div className="w-full flex mt-4 justify-around">
        <Link href={`/workout-log/resume/${workoutId}`}>
          <button className="pl-4 pr-6 flex items-center justify-center bg-stone-800 rounded-full border border-lime-300 h-10 font-bold text-lime-300">
            <span className="material-symbols-outlined">resume</span>Resume
          </button>
        </Link>
        <div>
          <Discard workoutId={workoutId} />
        </div>
      </div>
    </div>
  );
}
