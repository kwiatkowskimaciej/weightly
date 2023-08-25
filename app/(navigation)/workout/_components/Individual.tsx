import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import Link from 'next/link';

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

interface WorkoutsProps {
  workouts: Workout[];
}

export default function Individual({ workouts }: WorkoutsProps) {
  return (
    <div className="mt-4 mx-4">
      <Link href={'workout-log/new'}>
        <button className="w-full flex items-center justify-center  text-stone-50 bg-lime-900 rounded-full h-10 font-bold mb-4">
          <span className="material-symbols-outlined">add</span>New workout
        </button>
      </Link>
      {workouts.map((workout) => {
        return (
          <>
            <WorkoutCard
              key={workout.id}
              exerciseCount={workout._count.exercises}
              {...workout}
            />
          </>
        );
      })}
    </div>
  );
}
